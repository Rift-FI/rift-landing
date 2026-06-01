export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  cover?: string;
  readingTime?: string;
};

export type Post = PostMeta & {
  content: string;
};

const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 220));
  return `${mins} min read`;
}

function pathToSlug(path: string): string {
  const name = path.split("/").pop() || "";
  return name.replace(/\.md$/, "");
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, yaml, content] = match;
  const data: Record<string, unknown> = {};

  for (const rawLine of yaml.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    if (!line || line.startsWith("#")) continue;

    const colon = line.indexOf(":");
    if (colon === -1) continue;

    const key = line.slice(0, colon).trim();
    let value: string = line.slice(colon + 1).trim();

    if (!key) continue;

    // Array: [a, b, c]
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }

    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, content };
}

export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = pathToSlug(path);
    const { data, content } = parseFrontmatter(raw);
    const meta: PostMeta = {
      slug,
      title: (data.title as string) || slug,
      description: (data.description as string) || "",
      date: (data.date as string) || new Date().toISOString().slice(0, 10),
      author: (data.author as string) || "Rift Team",
      tags: (data.tags as string[]) || [],
      cover: (data.cover as string) || "",
      readingTime: readingTime(content),
    };
    return { ...meta, content };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
