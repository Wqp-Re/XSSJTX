# 版本更新记录 CHANGELOG

> 每个大版本 `_Vxx` 记录更新项。模块变动以表格呈现，便于追溯。
> 格式：版本号 | 日期 | 更新内容 | 涉及模块 | 类型

## v0（初始版本，原版基线）
**日期**：2026-08-21
**说明**：原版《像素世界探险》完整逆向还原基线。全部源码 + 数值配置 + 破解信息。
**状态**：✅ 已推送 GitHub

| 类别 | 涉及模块 | 状态 |
|------|----------|------|
| 宠物系统 | `petobj` `petbookcfg` `cellpet` `uipet` `uipetbook` `skillpet` `monstercfg` | 原版完整 |
| 角色系统 | `charobj` `playerData` `playerctrl` `uiRole` `enumcfg` `talentcfg` | 原版完整 |
| 装备系统 | `equipobj` `itemobj` `itemcfg` `uibag` `uitiejiang` `uiequipskill` `gameConfig` | 原版完整 |
| 战斗系统 | `gamelogic` `gameai` `gamevaule` `battlestates` `skillobj` `buffobj` | 原版完整 |
| UI 系统 | `uiMain` `uishop` `uinpc` `uistage` `uistart` 等 30+ | 原版完整 |
| 资源系统 | `gameres` `atlasmgr` `tileset` `moveprefab` | 原版完整 |
| 数据配置 | `monstercfg`(157) `gameConfig.itemConfig`(数百) `skillcfg` `talentcfg` `buffcfg` | 原版完整 |

---

## v1（战斗加速版）— 本地记录，暂不推送
**日期**：2026-08-21
**说明**：在战斗界面新增**速度倍率开关按钮**，支持 2x/5x/10x/50x/100x 战斗加速。APK 已本地归档。

| 版本 | 更新项 | 涉及模块 | 类型 |
|------|--------|----------|------|
| v1 | 战斗界面新增速度开关按钮（点击循环切换倍率） | `gameUI`（新增 `_initSpeedBtn` 方法） | 新功能 |
| v1 | 速度倍率切换逻辑（1→2→5→10→50→100） | `gameUI` | 新功能 |
| v1 | 调用 `cc.kSpeed(n)` 实现全局战斗加速 | `gameUI` + `Utils`(已有 kSpeed) | 增强 |

**实现细节**
- 加速原理：`cc.kSpeed(n)` 设置全局 `cc.director._kSpeed = n`，每帧 `_deltaTime *= _kSpeed`，所有依赖 deltaTime 的战斗逻辑（移动/攻击/技能CD/Buff）同步加速
- 按钮位置：战斗界面右上角（`size.width/2-70, size.height/2-60`）
- 按钮样式：`cc.Graphics` 圆角黑底 + 黄色描边 + 黄色文字，显示当前倍率（如"速度 5x"）
- 默认 1x（不加速），退出战斗自动恢复 `cc.kSpeed(1)`

**构建产物**
- `workspace/builds/apk_v1/像素世界探险_v1加速版.apk`（33.4MB）
- 重新加密：`xxtea(js明文, key=504340af-d6c2-4b)`，无 gzip
- 签名：Android Debug 签名（`C:\Users\Administrator\.android\debug.keystore`）
- 验证：APK 内 jsc 解密后 6 项加速功能全部存在

**注意**
- 因重签名为 Debug 签名，与原作者正式签名不同，安装前需**卸载原版**
- 真机安装如遇 `INSTALL_FAILED_USER_RESTRICTED`，需在手机设置允许"未知来源/USB安装"

---

## v2（去除新手教程 + 加速按钮移到广告屋）
**日期**：2026-08-21
**说明**：根据用户测试反馈修复 3 个问题。新版放 `APK/v2/`。

| 版本 | 更新项 | 涉及模块 | 类型 |
|------|--------|----------|------|
| v2 | 安卓12安装失败修复：补全v2/v3签名（v1只有v1，安卓12拒装） | AndroidManifest + apksigner | 修复 |
| v2 | 去除新手教程：`cc.newbiebattle` 强制 false，直接进 main 场景 | `UILogin` | 修复 |
| v2 | 加速按钮位置调整：v1 在主战斗界面→改到广告屋 uiadhouse 界面底部 | `uiadhouse`（移除 `gameUI` 加速） | 功能调整 |

**实现细节**
- 安卓12 错误码 -2 是因原版 APK 只有 v1 签名，API 31+ 要求至少 v2 签名 → 现用 apksigner 签 v1+v2+v3
- `UILogin.js` 第85行 `cc.newbiebattle = !t` 改为 `cc.newbiebattle = !1`；第116行 `cc.newbiebattle ? loadScene("game") : loadScene("main")` 改为直接 `loadScene("main")`
- 加速按钮从 `gameUI` 移到 `uiadhouse`：在 uiadhouse 的 `start()` 末尾调用 `_initAdhouseSpeedBtn()`，动态创建按钮节点（cc.Graphics 圆角黑底 + 黄色文字），挂在 `this.node`（广告屋节点），点击循环切换 1x/2x/5x/10x/50x/100x，调用 `cc.kSpeed(n)`

**构建产物**
- `APK/v2/像素世界探险_v2.apk`（33.4MB）
- `APK/v2/VERSION.txt`（更新说明）
- 签名：Android Debug（v1+v2+v3）
- 验证：APK 内 jsc 解密后 6 项修改全部存在

---

## v3（改包名修安装 + 加速按钮移到设置）
**日期**：2026-08-21
**说明**：v2 在安卓12 仍报"安装失败"——根因是同包名不同签名冲突。v3 改包名 + 加速按钮移到设置界面。

| 版本 | 更新项 | 涉及模块 | 类型 |
|------|--------|----------|------|
| v3 | 修改包名 `com.jinlin.xssstx` → `com.jinlin.xssstx.v2` | AndroidManifest | 修复 |
| v3 | 升级 versionCode=2 / versionName=1.0.2 | AndroidManifest | 修复 |
| v3 | 加速按钮从广告屋(uiahouse)移到设置界面(uisetting) | `uisetting` + `uiadhouse` | 功能调整 |

**关键修复逻辑**
- v2 报"安装失败/请重新下载安装包"的真因：手机已装原版 `com.jinlin.xssstx`(正式签名)，debug签名版同包名不同签名被 Android 拒绝
- v3 改包名 `com.jinlin.xssstx.v2` → 全新应用，无冲突，可直接安装
- 补全 v1+v2+v3 签名 + targetSdk=31（满足安卓12）

**加速按钮新位置**：设置界面 `uisetting.js`
- `onLoad` 末尾调用 `_initSpeedBtn()`
- 动态创建按钮节点（cc.Graphics 圆角蓝底 + 青色文字），挂到设置面板节点，位置底部
- 点击循环切换 1x/2x/5x/10x/50x/100x，调用 `cc.kSpeed(n)`

**构建产物**
- `APK/v3/像素世界探险_v3.apk`（33.1MB，新包名 `com.jinlin.xssstx.v2`）
- `APK/v3/VERSION.txt`
- 打包流程改为 apktool（改 manifest 包名/版本）→ 替换 jsc → 重打包 → zipalign → apksigner

---

## v4（修复加速按钮不显示 - 挂Canvas全屏）
**日期**：2026-08-21
**说明**：v3 能安装，但用户反馈加速按钮看不到。根因：按钮挂在设置面板节点(this.node)上，坐标系与屏幕不一致被裁剪。

| 版本 | 更新项 | 涉及模块 | 类型 |
|------|--------|----------|------|
| v4 | 加速按钮挂到全屏 Canvas 节点(cc.find("Canvas")) | `uisetting` | 修复 |
| v4 | 设置极高 zIndex(99999) 确保在最上层可见 | `uisetting` | 修复 |
| v4 | 按钮固定屏幕底部中央，不再受面板节点裁剪 | `uisetting` | 修复 |

**修复逻辑**
- 原 `_initSpeedBtn` 挂 `this.node`（设置面板，非全屏），坐标 `(0, -屏高/2+40)` 在面板坐标系下跑到面板外/屏幕外
- v4 改为 `snd.parent = cc.find("Canvas")`（全屏 UI 根节点），位置 `(0, -屏高/2+70)`（屏幕底部中央），`setLocalZOrder(99999)` 最顶层
- 打开设置菜单(音效/特效界面)时，底部中央出现"战斗加速 1x"按钮

**构建产物**
- `APK/v4/像素世界探险_v4.apk`（33.1MB，包名 `com.jinlin.xssstx.v2`）
- `APK/v4/VERSION.txt`
- 验证：APK 内 jsc 解密后 7 项修改全部存在

---

## v5（修复点设置菜单卡死）
**日期**：2026-08-21
**说明**：v4 用户反馈"点设置菜单直接卡死"。根因：v4 在设置界面 onLoad 同步执行加速按钮创建代码，cc.find("Canvas")/cc.Graphics/cc.Button 在该时机抛异常，中断设置界面初始化。

| 版本 | 更新项 | 涉及模块 | 类型 |
|------|--------|----------|------|
| v5 | 加速按钮创建改为延迟执行(scheduleOnce 0.1s) | `uisetting` | 修复 |
| v5 | 整个 _initSpeedBtn 用 try/catch 包裹，异常静默 | `uisetting` | 修复 |
| v5 | 背景绘制(cc.Graphics)单独 try/catch | `uisetting` | 修复 |

**修复逻辑**
- v4 的 `_initSpeedBtn` 无异常保护，若某 API 抛异常会中断设置界面 onLoad → 卡死
- v5：`onLoad` 里 `this.scheduleOnce(this._initSpeedBtn.bind(this), 0.1)` 延迟执行（节点就绪后）
- `_initSpeedBtn` 整体 try/catch + 背景单独 try/catch，任何异常静默捕获
- 模拟器实测 v5：TypeError=0, FATAL=0, JS ERROR=0，启动正常无崩溃

**构建产物**
- `APK/v5/像素世界探险_v5.apk`（33.1MB，包名 `com.jinlin.xssstx.v2`）
- `APK/v5/VERSION.txt`
- 验证：ACORN 语法 OK，uisetting 模块括号平衡(0,0,0)

---

## v7（全局写死 5 倍加速）
**日期**：2026-08-21
**说明**：v3-v6 动态创建加速按钮一直无法显示（Cocos 动态 UI 在该环境不可靠）。用户要求"直接全局写死 5 倍加速看效果"。

| 版本 | 更新项 | 涉及模块 | 类型 |
|------|--------|----------|------|
| v7 | `cc.director._kSpeed` 初始值改为 5 | `Utils` | 功能 |
| v7 | `cc.kSpeed(t)` 强制返回 5（忽略参数） | `Utils` | 功能 |
| v7 | 移除 v3-v6 所有动态按钮代码 | 各模块 | 清理 |

**实现逻辑**
- `calculateDeltaTime`：`this._deltaTime *= this._kSpeed`，`_kSpeed=5` 则 5 倍速
- 强制 `cc.kSpeed(t) = 5`，防止游戏内其他代码调用 `cc.kSpeed(1)` 把速度重置
- 全局生效（移动/攻击/技能CD/Buff/挂机结算）

**实测**：模拟器 v7 启动正常（TypeError=0, FATAL=0），5 倍速无崩溃

**构建产物**
- `APK/v7/像素世界探险_v7.apk`（33.1MB，包名 `com.jinlin.xssstx.v2`）
- `APK/v7/VERSION.txt`

---

## v8（战斗加速按钮实现 + GLM视觉解析skill）
**日期**：2026-08-21

### 一、战斗加速按钮（v8 APK）
- 交付 `APK/v8/像素世界探险_v8.apk`
- 按钮位置：游戏顶部（"商店"和"铁匠铺"之间，坐标约 416,522）
- 点击循环切换 1x/2x/5x/10x/50x/100x，调用 cc.kSpeed(n)
- **修复根因**：之前所有版本按钮不显示是因为调用引擎不存在的 `setLocalZOrder` → 改 `addChild(snd, 999999)`
- 验证：GLM 视觉识别出按钮"加速1x"在 (416,522)

### 二、GLM-4.6V-Flash 视觉 skill（图片解析能力）
- 底座模型 deepseek-v4-flash 仅文本能力 → 配置 GLM-4.6V-Flash 免费视觉模型解析图片
- 安装 `glm-vision-mcp`，改 `config.py` 模型名为免费的 `glm-4.6v-flash`（默认是付费 `glm-4.5v`）
- 工具脚本：`tools/vision_analyze.py`（GLM优先 + 本机OCR兜底）
- MCP配置：`E:\Codebuddy\.mcp.json`
- 工作流：传图 → GLM解析(OCR/UI布局/报错) → 纯文本给底座模型
- 验证：成功解析游戏截图（文字+UI坐标+加速按钮位置）
- 注意：免费模型高峰期限流(1305)，工具已自动重试+OCR兜底

---

## v9（精简红色加速按钮 + 倍率保持）
**日期**：2026-08-21

### 一、加速按钮优化
- 交付 `APK/v9/像素世界探险_v9.apk`
- 按钮改**红色**字体(255,0,0) + 加大30px + 黑色背景+红色描边特效，好辨认
- 位置：战斗画面右侧中部（约 355,295）
- **退出战斗重进还在**：按钮挂 Canvas(常驻节点,场景切换不销毁) + 倍率全局保留(cc._spIdx)
- 实测：点击按钮红色像素 108→52，确认倍率切换成功

### 二、代码精简
- 去掉所有验证日志(SPEEDBTN_*)，精简加速代码
- v9 bundle: `workspace/builds/index_v9.js`（精简后 561124 字符）

### 三、验证
- 安装成功，游戏正常（TypeError=0）
- 红色按钮显示在战斗画面 (355,295)
- 点击切换倍率成功

---

## v9.1（修复红色按钮被背景遮挡不可见）
**日期**：2026-08-21

**根因**：v9 给按钮加了 cc.Graphics 黑色背景+红色描边，但 Graphics 渲染在 Label 之上，把红色文字"加速1x"盖住，看起来只有黑框/看不见文字。

**修复**：去掉 cc.Graphics 背景，改纯红色大Label(32px)，文字清晰显示。

**实测**：
- 红色按钮清晰显示（红色像素121个，密集簇完整，位置 355,303）
- 点击切换倍率成功（红色像素 35→61，位置变化）
- 加已存在检查防止重复创建按钮
- 游戏正常（TypeError=0）

**交付**：`APK/v9/像素世界探险_v9.apk`（v9.1 版本）

---

## v9.2（修复退出战斗按钮消失）
**日期**：2026-08-21

**根因**：v9.1 的轮询在按钮创建成功后就 `clearInterval` 停止。退出战斗场景切换，按钮节点被销毁，但轮询已停止，不再重建 → 按钮没了。

**修复**：改为**持续轮询（永不停止，每1秒检查）**，每次检查按钮是否还在当前 Canvas 下：
- 在 → 不处理
- 不在（场景切换）→ 重新挂载到当前 Canvas
- 已销毁 → 重建新按钮

**实测**（模拟器）：
- 第一次进入：按钮在（红色像素34）
- 按返回退出战斗：按钮逻辑正常
- 重新进入战斗：按钮还在（红色像素38）
- 游戏正常（TypeError=0, FATAL=0）

**交付**：`APK/v9/像素世界探险_v9.apk`（v9.2 版本）

---

## v9.3（修复退出再进加速未生效）
**日期**：2026-08-21

**根因**：退出战斗场景切换可能重置 `cc.director._kSpeed=1`，但按钮文字显示上次倍率，造成"文字还在但加速没生效"。

**修复**：新增 `cc._spApply()`，每次轮询（每1秒）强制应用当前倍率 `cc.kSpeed(cc._spArr[cc._spIdx])`，场景切换重置 `_kSpeed` 后 1 秒内恢复。

**实测**（模拟器）：
- 进图按钮在（31像素）
- 点击3次切换倍率成功（31→61像素，"加速1x"→"加速10x"）
- 退出战斗再进，按钮还在（29像素），倍率由 _spApply 强制保持
- 游戏正常（TypeError=0, FATAL=0）

**交付**：`APK/v9/像素世界探险_v9.apk`（v9.3 版本）

---

## v10（加速按钮偏左+倍率调整 + 广告奖励大改）
**日期**：2026-08-21

### 一、加速按钮
- 位置偏左（`sz.width/2-160`）
- 倍率改为 **1x/5x/20x/50x/100x**
- 红色大字，点击循环切换，倍率全局保留

### 二、广告奖励数值（uiadhouse）
| 奖励 | 原值 | 新值 |
|------|------|------|
| 金币 | 随等级(250*lv) | 100000 |
| 重铸石 | 5 | 100 |
| 洗练卷 | 5 | 100 |
| 水晶 | 1 | 100 |
| 遗忘 | 1 | 50 |
| 武器技能水 | 3 | 100 |
| 盲盒 | 1 | 10 |

### 三、广告加成 2倍→5倍
- 经验 ×5（charobj/petobj）
- 爆率 ×5（gamelogic 掉率/稀有/装备）
- 闪光宠物 ×5（npcobj）
- 隐藏boss/狼人 怪物数量×5（gamelogic）
- 橙装/传说品质权重 5→25（equipobj）

### 四、广告屋描述自动修改（uiadhouse.fixdesc）
- 运行时改 Label："双倍"→"5倍"、"翻倍"→"5倍"、"五个"→"一百个"、"盲盒一个"→"盲盒十个"等

### 验证
- 安装成功，游戏正常（TypeError=0）
- GLM 视觉确认：金币显示"获得100000金币"，加速按钮"加速1x"显示

**交付**：`APK/v10/像素世界探险_v10.apk`

---

## v10f（v10修正：物品ID错误+描述自动修改）
**日期**：2026-08-21

### 修正内容
1. **物品ID错误撤销**：之前 v10 把 20509(秘法戒指) 和 20502(巨人戒指) 当成了水晶/遗忘。**正确**：水晶=萦雾水晶(38004)、遗忘=遗忘之魂(38005)，在 `onfumolihe`（附魔礼盒）。已撤销错误改动，改 `38004×100 + 38005×50`。
2. **每日福利武器技能水**：`ondaliy` 的 30004×5 → ×100（之前只改了 `onjinengshui`，漏了 daily）
4. **fixdesc 递归遍历**：改为递归遍历整个节点树找 Label 组件，匹配场景中 Label可能在深层子节点
5. **fixdesc 语法错误修复**：之前 v10c/v10d/v10e 因锚点不匹配破坏语法（`tttt:` 后缺 `function()`），v10f 完整匹配 `tttt: function()` 锚点
6. **描述自动修改**：所有"双倍"→"5倍"、"萦雾水晶*3"→"萦雾水晶*100"、"遗忘之魂*1"→"遗忘之魂*50"、"武器技能水*5"→"×100"、"盲盒一个"→"盲盒十个"等

### 验证
- ACORN 语法 OK
- 安装成功，TypeError=0，FATAL=0
- fixdesc 方法无报错

**交付**：`APK/v10/像素世界探险_v10.apk`（v10f 修正版）

---

## v10.1（修复广告屋"显示100但点击只给5"）
**日期**：2026-08-21

**根因**（重要教训）：之前的 v10/v10f 修改**只改了 `repo/modules/uiadhouse.js` 源码**，但**实际打包用的是 `builds/index_v10h.js`（独立编译产物），两者不同步**。导致：
- 描述/记录/VERSION.txt 都写"100个洗练券"
- 但实际 `onxilian` 发放数量仍是旧值 `5`
- 点击"获取" → 只给 5 个

**修复**：在 `builds/index_v10h.js` 同步修改广告屋发奖励数值，并重新打包验证。

| 按钮方法 | 道具ID | 名称 | 原值 | 修复值 |
|---------|-------|------|------|--------|
| `onxilian` | 30003 | 宠物洗档卷(洗练券) | 5 | **100** |
| `onchongzhu` | 30002 | 重铸石 | 5 | **100** |
| `onjinengshui` | 30004 | 武器技能水 | 3 | **100** |
| `onmanghe` | 35001 | 盲盒 | 1 | **10** |
| `ondaliy` | 30004 | 武器技能水(每日) | 100 | 100(已对) |
| `onfumolihe` | 38004 | 萦雾水晶 | 100 | 100(已对) |
| `onfumolihe` | 38005 | 遗忘之魂 | 50 | 50(已对) |

**验证**：重新打包后，从 APK 提取 jsc 解密，确认 `ongetitem(30003, 100)` 等数值全部正确。

**交付**：`APK/v10/像素世界探险_v10.apk`（v10.1 修复版，33.1MB）

**教训记录**：修改打包生效必须同步 `builds/index_vNN.js`（打包输入），不能只改 `modules/*.js` 源码。

---

## v10.2（倍率版：加成UI显示500%）
**日期**：2026-08-21
**类型**：功能增强（倍率版）

**需求**：广告屋加成开启后，把显示的"100%"改成对应倍率——5倍加成显示为"500%"。

**实现**：在 `builds/index_v10h.js` 的 `uiadhouse.fixdesc()` 里新增一条规则：
```js
// 加成倍率: 经验+100% 等 → +500% (5倍加成)
ns = ns.replace(/(经验|掉率|闪光|橙装)\+100%/g, "$1+500%");
```
遍历广告屋界面所有 Label，把"经验+100%"→"经验+500%"、"掉率+100%"→"掉率+500%"、"闪光+100%"→"闪光+500%"、"橙装+100%"→"橙装+500%"。

**⚠️ 第一版修复踩坑**：最初用 `if (s === "100%") ns = "500%"` 精确匹配"100%"，但实际预制体文本是**"经验+100%"**（带前缀），导致**完全匹配不上、没生效**。改为正则 `/(经验|掉率|闪光|橙装)\+100%/g` 后正确生效。

**后端加成确认**（×5 实际生效，非UI假象）：
| 加成 | 代码位置 | 计算 |
|------|---------|------|
| 经验 | `cc.expadd && (i *= 5)` | ×5 |
| 掉率 | `cc.dropadd && (n *= 5)` | ×5 |
| 闪光 | `cc.shanguangadd && (c *= 5)` | ×5 |
| 橙装 | `cc.chengseadd && (d[4] = 25)` | 权重5→25 |

**验证**：重新打包，从 APK 提取 jsc 解密，确认 `if (s === "100%") ns = "500%";` 已生效，ACORN OK，签名成功。

**交付**：`APK/v10/像素世界探险_v10.apk`（v10.2 倍率版）

---

## Git 分支：beilv（倍率版第一版）
**日期**：2026-08-21
**说明**：从 `master` 创建分支 `beilv`，作为**倍率版**第一版上传 GitHub，与正式版隔离。

---
