# 玩法模块清单（v11 整合版）

> 每个模块记录：功能入口、核心逻辑位置（bundle 行号）、数据/物品id、存档字段、UI方式。便于追溯与后续迭代。
> 行号基于 `v11_builds/index_v11.js`（后续迭代行号会漂移，以关键字搜索为准）。

---

## 1. 灵宠进化（源自 vA）

| 项 | 内容 |
|----|------|
| 入口 | 宠物界面红色按钮"灵宠进化 [上限10] 当前X"（initEvolveBtn 动态创建，start 调用） |
| 核心逻辑 | petobj: `this.evolve`/`evolvemax=10`/`evolveBonus=[2,3,5,7,10,14,19,25,32,40]`/`evolveStoneCost=[1,2,3,5,8,12,18,25,35,50]`/`doevolve()`/`getevolvecost()=5000×(阶+1)²` |
| 属性生效 | `setbp()` 内 `(this.evolveBonus && this.evolveBonus[this.evolve] || 0)` |
| 物品 | 30010 灵兽进化石（商店页签1：`[30010, 100, 5e5]` 100个/50万金） |
| 存档 | petobj `encode()/initwithsave()` 的 `t.evolve`（老档兼容 =0） |
| UI | `onclickevolve()` messageBox 确认（结果码：0成功/1进化石不足/2金币不足/3满阶） |

## 2. 深渊爬塔（源自 vB）

| 项 | 内容 |
|----|------|
| 入口 | 国王NPC → "深渊之塔"(f:18) / "深渊商店"(f:19) |
| 进入逻辑 | uinpc onclick f:18：`cc.abyssMode=!0; cc.rogue=!1; stageid=1; loadScene("game")` |
| 关卡生成 | gamelogic init：`else if (cc.abyssMode)` 深拷贝关卡配置，`e.lv=5×(1+floor(层×1.5))`，`e.count=1` 单挑boss |
| 怪物创建 | `else if (cc.abyssMode) { maxmonstercount=0; bosscount=0; createboss(); }` |
| 通关结算 | npcobj dodead：`else if (cc.abyssMode && this.isboss)` 深渊币=5+层×2(上限500)，`additembyid(30020)`，层+1 |
| 深渊商店 | uishop 页签201（12件商品深渊币计价）；currency 机制：`initdata` 设 `this.currency=(t==201)?30020:30005`；cellshop 传递；`buyitem(t,e,i,s,c)` 第5参货币id |
| 物品 | 30020 深渊币 |
| 存档 | `abyssfloor`(默认1) / `abysscoin`(默认0) |
| 退出重置 | `onclickback`/`clickfq` 里 `cc.abyssMode=!1` |

## 3. 肉鸽秘境（源自 vC）

| 项 | 内容 |
|----|------|
| 入口 | 国王NPC → "肉鸽秘境"(f:20) / "肉鸽商店"(f:21) |
| 关卡生成 | `if (cc.rogue)` 难度曲线 `e.lv=5+floor(层×1.5)+floor(层²/40)`；诅咒×1.6；boss词缀(0无/1狂暴攻+50%/2铁壁防+50%/3巨兽生+100%/4迅捷速+50%) |
| 三选一遗物 | boss死亡 → `cc.showRogueRelicPick()`（cc全局函数，Canvas挂载，按钮setContentSize触摸区+stopPropagation拦截） |
| 遗物池 | 14种（5001战意~5014再生），buffcfg 5001-5014；品质：普通×1/稀有×2/史诗×3/传说×5 |
| 遗物应用 | `cc.relicApply(player)`：player.gamevaule.addpv 按品质倍率累计；含联动combo（战意+荆棘等5组+收集5件加成） |
| 跨层保留 | `cc.rogueRelics` 数组全局；createmap 创建player后 `cc.relicApply(this.player)` 重新应用 |
| 随机事件 | 每5层（`(层-1)%5==0`）事件三选一：跃迁之门(跳关)/生命之泉(回血)/神秘宝箱(装备)/暗黑祭坛(诅咒高回报)/战神祝福/生命图腾/财富喷泉 |
| 结算 | dodead：结晶=5+层×3(诅咒×3)，`changeRgore`，层+1，弹三选一 |
| 肉鸽商店 | `createRgoreShop()` 10项永久强化（结晶计价），`buyPerm/getPermCost/getPermLv` |
| 严格rogue | `getplayerbsproperty()`：`if (cc.rogue) return {property:[爆伤]}`（永久加成不进局内）；进肉鸽时 rgorePerm 折算一次性基础值 |
| 属性封顶 | `shuxingrefresh()`：`cc.rogue && isplayer` 时 攻≤10000/生≤50000/暴≤50 |
| 存档 | `rgoreCrystal`(新档1e8) / `rgorePerm{}` |

## 4. 钓鱼系统（源自 vC）

| 项 | 内容 |
|----|------|
| 入口 | 国王NPC → "钓鱼"(f:22) / "鱼图鉴"(f:23) |
| 界面 | `createfishing()`：Canvas挂载深蓝面板(15,15,30,235)，抛竿按钮/挂机开关/鱼竿等级+升级/本次统计/关闭 |
| 流程 | 抛竿 → 2s → `cc.rollCast()` 三结果(按鱼竿等级 鱼/垃圾/宝箱) → 鱼：判定(行为序列A-D+耐力条) → 成功`_fishCatch`/垃圾`_fishTrash`/宝箱`_fishChest` |
| 判定 | 鱼在条内移动(速度按A-D)，按住屏幕游标跟随；在条内 耐力+30/秒+进度累计，丢失-40/秒；在条内时间≥needTime 捕获，耐力≤0 失败 |
| 鱼竿 | `cc.rodCfg` 10级(比例85/10/5→90/0/10，条长260→440，速度120→210，难度区55→32)；`cc.upgradeRod()` 费用1000×级² |
| 鱼种 | `cc.fishSpecies` 18种(A-D级, needTime 3~15s)；`cc.rollFish()` 难度权重抽取 |
| 物品 | 39001-39018（qulity 1~7） |
| 挂机 | uiMain.update：`fishAuto` 开启每15秒 `_fishCatch(null)` 自动钓；与手动抛竿互斥 |
| 图鉴 | `createfishbook()` 18种，已钓=品质色+数量/未钓灰???；品质色对齐系统 `cc.fishQulityColor`/`cc.fishQulityName` |
| 永久加成 | `getfishbsproperty()`：每解锁1种 攻+10/生+100/爆伤+2，合并进 `getplayerbsproperty`（肉鸽新局基础也生效） |
| 统计 | `fishStats`（各鱼历史次数）+ `_fishSession`（本次会话 鱼/垃圾/宝箱） |
| 存档 | `fishbook`/`fishAuto`/`fishcount`/`fishRodLv`/`fishStats` |

---

## 附：国王NPC功能号分配（uinpc onclick）

| f | 功能 |
|---|------|
| 1 | 需要帮助（原版） |
| 13 | 兑换码（原版） |
| 18 | 深渊之塔 |
| 19 | 深渊商店 |
| 20 | 肉鸽秘境 |
| 21 | 肉鸽商店 |
| 22 | 钓鱼 |
| 23 | 鱼图鉴 |

**已用物品id段**：30001-30010 材料/进化石、30020 深渊币、310xx 技能书、340xx 图纸、380xx 材料、39001-39018 鱼；buff：5001-5014 肉鸽遗物。
**新玩法接入建议**：入口挂国王 f:24+；物品用 39xxx 剩余段 / 31xxx；存档字段加 playerData init/savedata/loaddata 三处。

---

## 5. 猎人营地·经营建设层（源自 vD）

| 项 | 内容 |
|----|------|
| 入口 | 国王NPC → "猎人营地"(f:24) → `createCamp()`（Canvas挂载深蓝面板+系统配色） |
| 营地等级 | `cc.getCampLv()`（campLv 1~10），升级费用 `cc.campCfg.lvCost[当前级]`（5000~1000万），影响设施上限 `getFacMax()=min(10,campLv)` |
| 设施配置 | `cc.campCfg.facs`：pet宠物屋/forge铁匠铺/pond钓鱼塘/train训练场/store仓库/altar祭坛 |
| 设施升级 | `cc.upgradeFac(k)`：费用=`costBase×(当前级+1)×mul`；结果码 0成功/2达上限(需升营地)/3金币不足 |
| 设施加成 | `cc.getCampProperty()`：pet全属性+1/级、forge爆伤+10/级、pond生命+200/级、train攻击+20/级、store防御+10/级、altar掉率+5爆伤+5/级 |
| 加成生效 | `getplayerbsproperty` 合并（fishbook之后、肉鸽判断之前 → 全局生效含肉鸽新局基础） |
| 存档 | `campLv`(默认1) / `campFac{}`(默认空) |
| UI | `createCamp()`：标题+营地升级按钮+6设施行(名称/等级/效果/升级按钮)+返回按钮，升级后重建面板刷新 |

---

## 附：国王NPC功能号分配（uinpc onclick）

| f | 功能 |
|---|------|
| 1 | 需要帮助（原版） |
| 13 | 兑换码（原版） |
| 18 | 深渊之塔 |
| 19 | 深渊商店 |
| 20 | 肉鸽秘境 |
| 21 | 肉鸽商店 |
| 22 | 钓鱼 |
| 23 | 鱼图鉴 |
| 24 | 猎人营地 |
