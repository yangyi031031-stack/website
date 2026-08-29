# Vesper.ai Landing Page

一个单屏黑色视觉 landing page，基于粘贴的 Vesper.ai 设计规格重建。

## 功能

- 单文件 `index.html`
- 内联 CSS 和少量菜单/动画兜底 JS
- 桌面端单屏无滚动
- 移动端全屏菜单
- 黑色背景、液态金属按钮、入场动效和统计栏
- 导航和 CTA 按钮带弹窗式交互反馈
- 隐藏文本编辑模式，访问 `?edit=1` 后可修改页面文案

## 使用

直接打开 `index.html` 即可浏览首页。

文本编辑入口：

```text
https://website-7yu.pages.dev/?edit=1
```

进入后右下角会出现 `Edit Text`，可修改 Logo、Badge、标题、描述、按钮和统计文字。保存后的内容存储在当前浏览器 `localStorage`。

## 部署

可以把整个文件夹上传到 GitHub，然后使用 GitHub Pages、Cloudflare Pages 或 Vercel 部署。

### 注意

首页不再依赖 Supabase。旧的后台文件仍保留在仓库中，但首页不会链接到后台。
