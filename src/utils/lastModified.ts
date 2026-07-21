// src/utils/lastModified.ts

const OWNER = "jenzzly";
const REPO = "jenzzly.github.io";

const cache = new Map<string, string | null>();

export async function getLastEditedDate(
  collection: string,
  slug: string,
  fallback?: Date,
): Promise<string | null> {
  const cacheKey = `${collection}/${slug}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const filePath = `src/content/${collection}/${slug}.md`;

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "rwandavisa.com",
    };

    const token = import.meta.env.GITHUB_TOKEN;

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/commits?path=${encodeURIComponent(
        filePath,
      )}&per_page=1`,
      {
        headers,
      },
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API returned ${response.status}: ${response.statusText}`,
      );
    }

    const commits = await response.json();

    if (Array.isArray(commits) && commits.length > 0) {
      const date = commits[0]?.commit?.committer?.date;

      if (date) {
        const formatted = formatDate(new Date(date));

        cache.set(cacheKey, formatted);

        return formatted;
      }
    }
  } catch (error) {
    console.warn(
      `[lastModified] Could not fetch git history for ${filePath}:`,
      error,
    );
  }

  if (fallback) {
    const formatted = formatDate(fallback);
    cache.set(cacheKey, formatted);
    return formatted;
  }

  cache.set(cacheKey, null);
  return null;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}