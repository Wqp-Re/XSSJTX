# 像素世界探险 · 二开工程（逆向还原 + 扩展玩法）

> 基于作者开放的《像素世界探险 福利版》APK 逆向还原的完整源码工程。
> 已获作者授权二开。当前主线版本：**v11 整合版**（A+B+C 三线玩法合并）。

---

## 一、版本线总览

| 版本线 | 主题 | 状态 | bundle | APK |
|--------|------|------|--------|-----|
| v0 | 原版逆向还原基线 | ✅ 基线 | decrypted/ | - |
| v1-v10 | 原版迭代（广告屋/加速/倍率/新手优化等） | ✅ 已归档 | v10_builds | APK/v10 |
| vA | 灵宠进化（宠物深度养成） | ✅ 已并入 v11 | vA_builds | APK/vA |
| vB | 深渊爬塔（单挑boss无尽挑战） | ✅ 已并入 v11 | vB_builds | APK/vB |
| vC | 肉鸽秘境 + 钓鱼系统 | ✅ 已并入 v11 | vC_builds | APK/vC |
| **v11** | **整合版 = vA + vB + vC 全玩法合并** | ✅ **当前主线** | v11_builds | APK/v11 |
| vD（规划中） | 猎人营地·经营建设层 | 🚧 开发中 | - | - |

> **版本规则**：大版本 `_Vxx` 数字迭代（v11/v12...）；实验分支用字母（vA/vB/vC），验证后并入数字主线。

---

## 二、v11 整合版玩法模块总览

| 模块 | 入口 | 核心机制 | 存档字段 |
|------|------|---------|---------|
| **灵宠进化** | 宠物界面"灵宠进化"按钮 | 进化0~10阶，每阶全成长递增(+2~+40)，消耗金币+进化石(30010) | pet.evolve |
| **深渊爬塔** | 国王NPC→"深渊之塔"(f:18) | 单挑boss，boss属性×5，通关得深渊币(30020)+推层 | abyssfloor / abysscoin |
| **深渊商店** | 国王NPC→"深渊商店"(f:19) | uishop页签201，深渊币计价12件商品（currency机制） | - |
| **肉鸽秘境** | 国王NPC→"肉鸽秘境"(f:20) | 无限爬层+三选一遗物(14种,品质分级)+随机事件(7种每5层)+boss词缀+诅咒 | rgoreCrystal / rgorePerm |
| **严格rogue规则** | 自动（进肉鸽生效） | 局内属性封顶(攻≤1w/生≤5w/暴≤50)；永久加成只在新局折算一次 | - |
| **钓鱼系统** | 国王NPC→"钓鱼"(f:22) | 星露谷式判定(抛竿2s三结果/耐力条/鱼行为序列A-D)+鱼竿升级10级+18种鱼 | fishbook / fishAuto / fishcount / fishRodLv / fishStats |
| **鱼图鉴** | 国王NPC→"鱼图鉴"(f:23) | 18种鱼收集+每解锁1种永久加成(攻+10/生+100/爆伤+2) | fishbook |

**互斥规则**：肉鸽(cc.rogue) 与 深渊(cc.abyssMode) 互斥，进入一方自动重置另一方；返回主城双清。

---

## 三、目录结构

```
repo/
├── README.md            # 本文件（项目主规范）
├── modules/             # 144 个游戏模块源码（逆向还原）
├── configs/             # 数值配置参考
├── decrypted/           # 原始解密的 browserify 打包源码（v0基线）
├── docs/
│   ├── CHANGELOG.md     # 版本更新记录（持续维护）
│   ├── MODULES.md       # 玩法模块清单（入口/数据/改动点追溯）
│   ├── 01~06_*.md       # 逆向分析/构建/数据报告
├── v10_builds/          # v10 线 bundle
├── vA_builds/           # A线 bundle（宠物进化）
├── vB_builds/           # B线 bundle（深渊爬塔）
├── vC_builds/           # C线 bundle（肉鸽+钓鱼）
└── v11_builds/          # v11 整合版 bundle（当前主线）
```

**构建产物**（不在 git 内）：`../APK/vXX/像素世界探险_vXX.apk` + `VERSION.txt`

---

## 四、构建流程（tools/）

```bash
# 语法校验 → XXTEA加密 → apktool重打包 → zipalign → apksigner签名
python tools/build_v11.py    # v11整合版（改 SRC/OUT_DIR 即可复用其他版本）
```

**关键链路**：
1. `workspace/builds/index_vXX.js`（明文bundle，**改这里才生效**）
2. XXTEA 加密（key `504340af-d6c2-4b`）→ `index.ae18c.jsc`
3. 替换进 `tools/apk_decomp/` → apktool b → zipalign → apksigner
4. 输出 `APK/vXX/`

> ⚠️ **教训**：改 `modules/*.js` 源码不影响 APK；必须同步改 `builds/index_vXX.js`（打包输入）。

---

## 五、关键破解信息

- 引擎：Cocos Creator 2.4.x / 2.3.x JSB（JavaScriptCore）
- 脚本加密：XXTEA，**Key：`504340af-d6c2-4b`**（libcocos2djs.so 提取）
- 解密：`xxtea.decrypt(jsc_data, key)`；验证：从 APK 提取 jsc 解密后 grep 关键改动

---

## 六、开发规范

1. **改动必须双写**：`builds/index_vXX.js`（生效）+ 本仓库 `vXX_builds/`（存档）
2. **每次迭代必须更新**：`docs/CHANGELOG.md` + `APK/vXX/VERSION.txt`（不删旧版本）
3. **APK 归档**：`APK/vXX/` 一版一目录，写清版本号与更新内容
4. **推送规则**：用户明确说推才推（git push origin master / beilv）
5. **玩法接入规范**：新玩法入口统一挂国王NPC func（f 号已用：1,13,18,19,20,21,22,23）；物品id分段：30xxx材料/39xxx鱼/50xx肉鸽buff
6. **验证规范**：每次打包后从 APK 提取 jsc 解密 grep 验证关键改动打入

## 七、版本更新记录
见 `docs/CHANGELOG.md`（v0~v11 完整追溯）
