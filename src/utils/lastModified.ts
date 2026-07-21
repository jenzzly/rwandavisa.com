import { execSync } from 'node:child_process';
import path from 'node:path';

/**
 * Returns the real last-commit date for a content file, so "Updated" labels
 * reflect true edits instead of a fake always-current date (which Google's
 * spam policies flag as a manipulative freshness signal).
 *
 * Works because Decap CMS commits every content change as a real git commit.
 * Requires the build to run against a full git history (see
 * .github/workflows/deploy.yml — fetch-depth: 0). Falls back to the
 * frontmatter `date` field, then to null, if git history isn't available
 * (e.g. a fresh checkout with no commits yet, or a zip export like this one).
 */
export function getLastEditedDate(collectionName: string, entrySlug: string, fallback?: Date): string | null {
  try {
    const filePath = path.join('src', 'content', collectionName, `${entrySlug}.md`);
    const raw = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString().trim();

    if (raw) {
      return formatDate(new Date(raw));
    }
  } catch {
    // No git history available at build time — fall through to fallback.
  }

  if (fallback) return formatDate(fallback);
  return null;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
