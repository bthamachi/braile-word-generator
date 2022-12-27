import glob from "fast-glob";
import * as path from "path";
import { PostData } from "../types/Post";

export const importArticle = async (articleFileName: string) => {
  const data = await import(`../pages/blog/${articleFileName}`);
  const { meta } = data;

  const returnObject = {
    slug: articleFileName.replace(/(\/index)?\.mdx$/, ""),
    meta,
  } as PostData;
  return returnObject;
};

export const getAllArticles = async () => {
  const articleFilenames = await glob(["*.mdx", "*/index.mdx"], {
    cwd: path.join(process.cwd(), "src/pages/blog"),
  });

  const articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort(
    (a, b) =>
      new Date(b.meta.date as Date).getTime() -
      new Date(a.meta.date as Date).getTime()
  );
};
