import { ReactNode } from "react";
import { AUTHOR } from "../constants/seo";
import { formatDateFromMetadata } from "../lib/date";
import { Metadata as MetaType } from "../types/Post";
import Footer from "./Footer";
import Header from "./Header";
import Metadata from "./Metadata";

type LayoutProps = {
  children: ReactNode;
  meta: MetaType;
};

const Layout = ({ children, meta }: LayoutProps) => {
  return (
    <>
      <Metadata
        title={meta.title}
        description={meta.description}
        author={AUTHOR}
      />
      <div className="relative overflow-hidden">
        <Header />
        <div className="prose mx-auto mt-10 max-w-3xl dark:prose-invert sm:mt-10">
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {meta.title}
          </h1>
          <time
            dateTime={new Date(meta.date as Date).toDateString()}
            className="flex items-center text-base text-zinc-400 dark:text-zinc-500"
          >
            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
            <span className="ml-3">{formatDateFromMetadata(meta)}</span>
          </time>
          <div className="mt-10">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
