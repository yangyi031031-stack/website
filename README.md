# Vesper.ai Landing Page

一个黑色高级感的 Vesper.ai 单页官网，首页内容由 Supabase 统一管理。

## 当前架构

- `index.html`：正式首页，单文件页面，内置响应式样式和交互逻辑。
- `benefits.html`、`how-it-works.html`、`pricing.html`、`faq.html`：四个正式响应式子网页。
- `subpage.css`、`subpage.js`：子网页共用样式、移动端菜单与 Supabase 内容读取。
- `admin.html`：隐藏后台入口，用于登录后编辑首页及四个子网页内容。
- `admin.css`：后台双端响应式样式。
- `admin.js`：后台登录、读取和保存 Supabase 内容。
- Supabase 表：`site_content`，按 `section` 保存 Logo、标题、按钮、统计、SEO、视频等内容。

## 已实现

- 首页文字从 Supabase 读取，不再使用 `localStorage`。
- `?edit=1` 仍可作为临时编辑入口，但必须先登录 Supabase Auth，保存后所有访客可见。
- 正式后台：`/admin.html`，可统一编辑首页和四个子网页。
- 首页导航已连接到真实子网页，不再使用占位锚点。
- 按钮和导航链接可在后台配置真实目标，例如表单、微信二维码页、邮箱、预约链接、视频案例页。
- 背景视频支持 Supabase 配置视频 URL 和 poster URL，并保留 CSS 渐变 fallback。
- 已加入基础 SEO：`meta description`、Open Graph、Twitter Card、`theme-color`、canonical。
- 页面和后台都做了桌面端与移动端响应式优化。

## 后台入口

```text
https://website-7yu.pages.dev/admin.html
```

登录使用 Supabase Auth 里创建的管理员邮箱和密码。

## Supabase 数据表要求

需要存在 `public.site_content` 表，建议结构：

```sql
create table if not exists public.site_content (
  section text primary key,
  title text not null default '',
  content text not null default '',
  updated_at timestamptz not null default now()
);
```

RLS 建议：

- `anon` 和 `authenticated` 可以读取 `site_content`，保证首页公开可读。
- 只有 `authenticated` 可以新增和更新 `site_content`，保证后台登录后才能保存。

## 内容字段

后台会维护这些 `section`：

- `seo`
- `canonical`
- `og_image`
- `video`
- `logo`
- `badge`
- `headline_pre`
- `headline_em`
- `headline_post`
- `headline_line2`
- `lede`
- `nav_benefits`
- `nav_how`
- `nav_faqs`
- `nav_pricing`
- `cta_primary`
- `cta_secondary`
- `stat_1`
- `stat_2`
- `stat_3`

## 按钮链接建议

- `Start for Free`：可填 `mailto:你的邮箱?subject=Start%20for%20Free`、预约链接、表单链接或微信二维码页面。
- `See it in action`：可填演示视频、作品案例、产品 Demo 页面。
- `Pricing`：可填价格说明页面或价格弹窗页面。
- `FAQs`：可填常见问题页面锚点或单独 FAQ 页面。

如果链接仍是 `#demo`、`#pricing` 这类占位锚点，首页会提示需要在后台设置真实 URL。

## 部署

推送到 GitHub 后，Cloudflare Pages 会按仓库内容重新部署。部署完成后访问：

```text
https://website-7yu.pages.dev/
```

## 子网页

- Benefits：`/benefits.html`
- How It Works：`/how-it-works.html`
- Pricing：`/pricing.html`
- FAQs：`/faq.html`

所有子网页共用一致的深色视觉系统，并针对桌面、平板和手机布局优化。子页默认文案可直接显示；管理员在 `/admin.html` 保存后，会写入现有 `site_content` 表并覆盖默认文案。
