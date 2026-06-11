import { getAllTags, normalizePosts } from "../lib/posts";

const posts = normalizePosts(import.meta.glob("./blog/*.md", { eager: true }));

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about/", priority: "0.8", changefreq: "monthly" },
  { path: "/services/", priority: "0.8", changefreq: "monthly" },
  { path: "/archive/", priority: "0.7", changefreq: "weekly" },
];

export async function GET(context) {
  const site = context.site ?? new URL("https://guankaidi.com/");
  const tags = getAllTags(posts);
  const entries = [
    ...staticPages,
    ...posts.map((post) => ({
      path: withTrailingSlash(post.url),
      lastmod: toIsoDate(post.pubDate),
      priority: "0.7",
      changefreq: "monthly",
    })),
    ...tags.map((tag) => ({
      path: `/tags/${encodeURIComponent(tag)}/`,
      priority: "0.5",
      changefreq: "weekly",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map((entry) => renderUrlEntry(entry, site))
    .join("\n")}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function renderUrlEntry(entry, site) {
  const loc = xmlEscape(new URL(entry.path, site).href);
  const lastmod = entry.lastmod ? `\n    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>` : "";
  const changefreq = entry.changefreq ? `\n    <changefreq>${entry.changefreq}</changefreq>` : "";
  const priority = entry.priority ? `\n    <priority>${entry.priority}</priority>` : "";
  return `  <url>\n    <loc>${loc}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
}

function withTrailingSlash(path) {
  if (path === "/") {
    return path;
  }

  return path.endsWith("/") ? path : `${path}/`;
}

function toIsoDate(date) {
  return new Date(date).toISOString();
}

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
