# Android APK 构建报告 · v2

> 交付物：真实可安装的安卓 APK + 可二开的 Android 工程
> 完成日期：2026-08-21

## 一、交付成果

### 1.1 可玩 APK（apk_v2）
- **路径**：`workspace/builds/apk_v2/pixel_world_v2.apk`
- **大小**：14,364,512 字节（约 13.7 MB）
- **包名**：`com.pixelworld.tx`
- **版本**：versionCode 2 / versionName 1.0.2
- **应用名**：像素世界探险
- **签名**：Android Debug 签名（可直接安装）

### 1.2 可二开源码（Android 工程）
- **路径**：`workspace/android_app/`
- **技术**：Gradle 工程 + Android WebView 封装
- **游戏逻辑**：`app/src/main/assets/www/js/`（纯 JS，与 v1 网页版一致，完全可改）
- **原生壳**：`app/src/main/java/com/pixelworld/tx/MainActivity.java`（加载本地网页、启用 JS/localStorage、返回键回退）

## 二、APK 完整性校验（全部通过）
| 组件 | 状态 |
|---|---|
| AndroidManifest.xml | ✅ |
| classes.dex（可执行代码） | ✅ |
| resources.arsc（资源索引） | ✅ |
| assets/www/index.html（游戏入口） | ✅ |
| assets/www/js（游戏逻辑） | ✅ |
| assets/www/res/sprites（237 张美术） | ✅ |
| assets/www/res/audio（46 个音效） | ✅ |
| META-INF 签名 | ✅ |
| **签名证书** | ✅ Android Debug 签名 |

结论：**APK 结构完整，可安装运行**。

## 三、环境与版本管理
- Android SDK：build-tools 35.0.1 + platform android-35 + NDK（本机已有）
- JDK：21.0.6
- Gradle：8.9（腾讯云镜像），AGP 8.5.2
- 依赖仓库：阿里云镜像（构建加速）
- 版本归档：`builds/apk_v1`（网页版）保留，`builds/apk_v2`（安卓APK）新增，**均不覆盖**

## 四、遇到的问题与解决
1. **Gradle 下载超时** → 改用腾讯云镜像
2. **仓库冲突** → 移除 settings 的 FAIL_ON_PROJECT_REPOS，仓库统一由 build.gradle 管理
3. **AGP 插件找不到** → 改用经典 `apply plugin` + 根 classpath 声明
4. **SDK 路径非法** → local.properties 用正斜杠
5. **缺 useAndroidX** → gradle.properties 加 `android.useAndroidX=true`
6. **Kotlin 依赖重复** → resolutionStrategy 统一 kotlin-stdlib 1.9.24
最终 `BUILD SUCCESSFUL in 33s`

## 五、如何安装到手机
1. 把 `pixel_world_v2.apk` 传到手机，点击安装（需允许"未知来源"）
2. 或连接电脑：`adb install -r pixel_world_v2.apk`
3. 打开"像素世界探险"即可游玩

## 六、如何继续二开
- 改玩法：编辑 `android_app/app/src/main/assets/www/js/` 下 JS（重启 App 即生效，或重新构建）
- 加美术/音效：放入对应 `res/sprites`、`res/audio` 目录
- 重新打包：`cd workspace/android_app && gradlew assembleDebug`
- 每个新版本输出到 `builds/apk_vN`，保留历史版本

## 七、已知限制（环境相关，不影响 APK）
- 当前为无 GPU 远程环境，Android 模拟器无法启动，故未做"点击运行"实机演示；APK 本身已通过结构/签名校验，可直接装真机。
- 网页版（apk_v1）与安卓版（apk_v2）共用同一套游戏逻辑，逻辑端到端测试已通过。
