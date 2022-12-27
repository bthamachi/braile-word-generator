import Head from "next/head";
import { AUTHOR, WEBSITE_DESCRIPTION, WEBSITE_NAME } from "../constants/seo";

type MetadataProps = {
  title?: string;
  description?: string;
  author?: string;
};

const Metadata = ({ title, description, author }: MetadataProps) => {
  return (
    <Head>
      <title>{title ? title : WEBSITE_NAME}</title>
      <meta
        name="description"
        content={description ? description : WEBSITE_DESCRIPTION}
      />
      <meta name="author" content={AUTHOR} />
      <meta property="og:title" content={title ? title : WEBSITE_NAME} />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content={description ? description : WEBSITE_DESCRIPTION}
      />
      <meta name="twitter:title" content={title ? title : WEBSITE_NAME} />
      <meta
        name="twitter:description"
        content={description ? description : WEBSITE_DESCRIPTION}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="robots" content="all" />
    </Head>
  );
};

export default Metadata;
