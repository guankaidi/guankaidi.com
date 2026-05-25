type MarkdownPostModule = {
  frontmatter: {
    title: string;
    description: string;
    pubDate: string | Date;
    updatedDate?: string | Date;
    tags?: string[];
    readingTime?: string;
  };
  url: string;
};

export type BlogPost = MarkdownPostModule["frontmatter"] & {
  url: string;
  pubDate: string;
  tags: string[];
};

export function normalizePosts(modules: Record<string, unknown>): BlogPost[] {
  return Object.values(modules)
    .map((module) => {
      const post = module as MarkdownPostModule;
      return {
        ...post.frontmatter,
        url: post.url,
        pubDate: toDateString(post.frontmatter.pubDate),
        tags: post.frontmatter.tags ?? [],
      };
    })
    .sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Shanghai",
  }).format(new Date(date));
}

export function getAllTags(posts: BlogPost[]) {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) =>
    a.localeCompare(b, "zh-CN"),
  );
}

function toDateString(date: string | Date) {
  if (date instanceof Date) {
    return date.toISOString();
  }

  return date;
}
