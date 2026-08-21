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
