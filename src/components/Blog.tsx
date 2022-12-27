import Link from "next/link";
import { formatDateFromMetadata } from "../lib/date";
import { generatePostSlug } from "../lib/url";
import { PostData } from "../types/Post";

type BlogProps = {
  articles: PostData[];
};

const Blog = ({ articles }: BlogProps) => {
  return (
    <div className="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-5xl">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Articles
          </h2>
        </div>
        <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {articles.map((post) => (
            <div key={post.meta.title}>
              <p className="text-sm text-gray-500">
                <time dateTime={formatDateFromMetadata(post.meta)}>
                  {formatDateFromMetadata(post.meta)}
                </time>
              </p>
              <a href="#" className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900">
                  {post.meta.title}
                </p>
                <p className="mt-3 text-base text-gray-500">
                  {post.meta.description}
                </p>
              </a>
              <div className="mt-3">
                <Link href={generatePostSlug(post.slug)}>
                  <p className="cursor-pointer text-base font-semibold text-indigo-600 hover:text-indigo-500">
                    Read full story
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
