# Apple Style Studio

一个苹果风格的响应式图文介绍网站，支持浏览器内在线编辑。

## 功能

- 苹果风格极简 UI
- 手机 / iPad / PC 自适应
- 夜间模式
- 文字直接编辑
- 图片在线替换
- localStorage 本地保存
- 无需后端即可运行

## 使用

直接打开 `index.html` 即可。

点击右上角「编辑页面」：
1. 点击文字直接修改
2. 点击图片上的「更换图片」上传本地图片
3. 点击「保存修改」

## 部署

可以把整个文件夹上传到 GitHub，然后使用 GitHub Pages、Cloudflare Pages 或 Vercel 部署。

### 注意

当前版本的图片和文字修改保存在浏览器 localStorage 中，只对当前浏览器有效。

如果要实现「所有网站用户都能看到修改后的内容」，需要增加后端数据库和图片存储，例如：

- Cloudflare Workers + D1 + R2
- Supabase Auth + PostgreSQL + Storage
