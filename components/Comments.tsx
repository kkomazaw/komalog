"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const { theme } = useTheme();

  // Note: Replace these values with your own GitHub repository details
  // To enable Giscus comments:
  // 1. Create a public GitHub repository
  // 2. Enable Discussions in the repository settings
  // 3. Install the Giscus app: https://github.com/apps/giscus
  // 4. Get your repository ID and category ID from: https://giscus.app
  // 5. Add the following to your .env.local:
  //    NEXT_PUBLIC_GISCUS_REPO=username/repo
  //    NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id
  //    NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
  //    NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !category || !categoryId) {
    return (
      <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Comments are not configured. See{" "}
          <code className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            components/Comments.tsx
          </code>{" "}
          for setup instructions.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <Giscus
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="specific"
        term={slug}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="ja"
        loading="lazy"
      />
    </div>
  );
}
