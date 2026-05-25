# 关凯迪个人站

一个适合部署到 Cloudflare Pages 的 Astro 静态个人博客，域名规划为 `guankaidi.com`。

## 本地运行

```bash
npm install
npm run dev
```

## 写新文章

在 `src/pages/blog/` 新增 Markdown 文件：

```md
---
layout: ../../layouts/PostLayout.astro
title: 文章标题
description: 文章摘要
pubDate: 2026-05-25
tags: ["标签一", "标签二"]
readingTime: "4 分钟"
---

正文内容。
```

首页、文章页、标签页和 RSS 会自动读取文章。

## GitHub Pages 免费部署

仓库推到 GitHub 后，在仓库的 `Settings -> Pages` 里把 Source 设为 `GitHub Actions`。之后推送 `main` 分支会自动部署。

域名已经通过 `public/CNAME` 配置为：

```text
guankaidi.com
```

## Cloudflare Pages 部署

1. 把这个项目推送到 GitHub。
2. 在 Cloudflare Pages 选择连接 GitHub 仓库。
3. 如果仓库根目录就是本项目，直接使用下面配置；如果仓库根目录是当前工作区，Root directory 填 `apps/blog-site`。

```text
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: apps/blog-site
```

站点域名已经在 `astro.config.mjs` 配置为：

```js
site: "https://guankaidi.com"
```

## 费用

托管可以使用 Cloudflare Pages 免费版。域名已经是 `guankaidi.com`，后续需要在 DNS 里指向 Cloudflare Pages。
