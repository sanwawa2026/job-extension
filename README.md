# SuperJobGenie - AI求职匹配与跨赛道分析 (v2.1.0)

> 解决 Indeed 抓取 153 字截断 Bug，全量提取 3,000+ 字职位描述，提供真实多维技能匹配与跨赛道职业转换分析。

---

## 🎯 核心问题根治：153 字截断与虚假 98% 满配

### 1. 为什么此前只抓取了 153 个字？
- **旧抓取逻辑：** 仅抓取了 Indeed 搜索列表项的预览卡片（`.job-snippet`）或仅获取了首个 `<p>` 节点（通常为前导问候语，恰好约 153 个字符）。
- **微前端与懒加载：** Indeed 真实职位描述位于深层动态加载的容器 `#jobDescriptionText` 内。
- **现已彻底修复：**
  - **第 1 重保障：** 优先解析 Indeed 原生内嵌的 `Schema.org JSON-LD` 结构化数据 (`<script type="application/ld+json">`)，直接提取 100% 原始纯净、无任何页面折叠与字数限制的完整 JD (3,000+ 字)。
  - **第 2 重保障：** DOM 深度递归遍历器，靶向解析 `#jobDescriptionText` 及所有子级列表（`<li>`）、加粗段落与职责划分。

### 2. 真实多维加权评分体系（拒绝假冒满配）
- **旧结果：** 153 字中仅识别出 1 个单词 "AI"，因候选人简历包含 AI 标签，错误算出 1/1 = 100% (加权 98%) 虚假满配。
- **新结果：** 抓取 3,000+ 字后，全面核验 A/B Testing、假设检验、统计推断、时序预测等 14 项关键指标。资深架构师被准确判定为 **54% 跨赛道高潜力匹配 (Cross-Track Pivot)**，并给出降维打击式转型建议与 FAANG 高阶求职信。

---

## 📦 如何在本地加载 Chrome 插件

1. 下载或解压项目中的 `extension` 目录。
2. 打开 Google Chrome 或 Edge 浏览器，在地址栏输入：
   ```text
   chrome://extensions/
   ```
3. 开启右上角的 **「开发者模式」(Developer Mode)** 开关。
4. 点击左上角的 **「加载已解压的扩展程序」(Load unpacked)**。
5. 选中本地的 `extension` 文件夹即可完成安装！
6. 打开任意 Indeed 职位页面（例如 DataAnnotation 的 AI Trainer 岗位），右下角会自动弹出 **SuperJobGenie HUD 智能浮窗**，显示实时抓取的 3,000+ 字符与深度匹配雷达！

---

## 💻 本地运行完整 Web 应用与控制台

```bash
# 1. 安装依赖
npm install

# 2. 启动本地全栈服务 (Express API + Vite SPA)
npm run dev

# 3. 浏览器访问
http://localhost:3000
```
