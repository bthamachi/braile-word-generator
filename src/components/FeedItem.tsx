import { ReactNode } from "react";

type FeedItemProps = {
  index: number;
  ctaButtonText: string | null;
  onClick?: () => void;
  children: ReactNode;
  sectionTitle: string;
};

const FeedItem = ({
  index,
  ctaButtonText,
  sectionTitle,
  onClick,
  children,
}: FeedItemProps) => {
  return (
    <li className="my-10">
      <div className="relative pb-8">
        <div className="relative flex space-x-3">
          <div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white">
              {index}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
              <p className="text-md font-bold text-gray-800">{sectionTitle}</p>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-gray-500">
              {ctaButtonText && onClick ? (
                <button
                  onClick={() => onClick()}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {ctaButtonText}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 pt-4">{children}</div>
    </li>
  );
};

export default FeedItem;
