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
      <div className="relative pb-8 ">
        <div className="flex flex-col  sm:flex-row  sm:justify-between">
          <div className="mb-5 md:mb-0 md:grow">
            <p className="text-md font-bold text-gray-800">
              {index} <span className="ml-2">{sectionTitle}</span>
            </p>
          </div>
          <div className="ml-2 md:ml-0">
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
      <div className=" px-1 pt-4 md:px-10">{children}</div>
    </li>
  );
};

export default FeedItem;
