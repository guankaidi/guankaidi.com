import rss from "@astrojs/rss";
import { normalizePosts } from "../lib/posts";

const posts = normalizePosts(import.meta.glob("./blog/*.md", { eager: true }));

export async function GET(context) {
  return rss({
    title: "关凯迪",
    description: "关凯迪的个人站：记录 AI 内容系统、个人 IP 写作、内容流程搭建和语音输入工具探索。",
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: new Date(post.pubDate),
      link: post.url,
      categories: post.tags,
    })),
  });
}
