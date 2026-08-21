# 像素世界探险 · 二开工程（逆向还原源码）

> 基于作者开放的《像素世界探险 福利版》APK 逆向还原的完整源码工程。
> 已获作者授权二开。本仓库为**初始版本 v0**（原版基线）。

## 版本
- **v0（本版本）**：原版源码完整还原基线
- 后续大版本以 `_Vxx` 迭代，如 `v1`、`v2`...

## 目录结构
```
source/
  modules/        # 144 个游戏模块源码（宠物/角色/装备/技能/UI等）
  configs/        # 数值配置（monstercfg宠物、itemConfig装备、skill技能、talent天赋、buff）
  decrypted/      # 原始解密的 browserify 打包源码
  docs/           # 逆向分析报告 + 版本更新记录
  reports/        # 逆向分析报告
```

## 关键破解信息
- 引擎：Cocos Creator 2.4.x / 2.3.x JSB（JavaScriptCore）
- 脚本加密：XXTEA
- **XXTEA Key：`504340af-d6c2-4b`**（从 libcocos2djs.so 的 `Cocos Game.` 字符串提取）
- 解密算法：`xxtea.decrypt(jsc_data, key)` + 可选 gzip/zlib inflate

## 主要玩法系统
- 宠物：157 种怪物/宠物，捕捉/升级/转生/技能/洗练
- 角色：23 种属性，6 系伤害，装扮系统
- 装备：数百件装备/材料，强化/品质/属性成长
- 技能/天赋/Buff/掉落/NPC/全套UI/服务器通信/多平台SDK

## 版本更新记录
见 `docs/CHANGELOG.md`
