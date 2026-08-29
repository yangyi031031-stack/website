# Apple Style Studio

一个苹果风格的响应式图文介绍网站，使用 Supabase 管理图片和首页文字。

## 功能

- 苹果风格极简 UI
- 手机 / iPad / PC 自适应
- Supabase Auth 管理后台登录
- Supabase Storage 上传图片
- Supabase PostgreSQL 保存图片信息和首页文字
- 后台编辑网站名称、网页描述、首页文案、作品区标题和页脚

## 使用

直接打开 `index.html` 即可浏览首页。

后台地址不在首页显示，直接访问 `admin.html`：
1. 使用 Supabase Auth 中的管理员账号登录
2. 上传图片并填写标题、描述
3. 修改网页文字内容

## 部署

可以把整个文件夹上传到 GitHub，然后使用 GitHub Pages、Cloudflare Pages 或 Vercel 部署。

### 注意

当前版本依赖 Supabase 的公开 anon/publishable key。上线前需要配置 Row Level Security，确保只有登录管理员能写入、更新和删除数据。

建议的数据表：

- `gallery`: `id`, `title`, `description`, `image_url`, `path`, `created_at`
- `site_content`: `section`, `title`, `content`
