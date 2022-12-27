// /**
//  * Don't be scared of the generics here.
//  * All they do is to give us autocompletion when using this.
//  *
//  * @template {import('next').NextConfig} T
//  * @param {T} config - A generic parameter that flows through to the return type
//  * @constraint {{import('next').NextConfig}}
//  */
// function defineNextConfig(config) {
//   return config;
// }

// export default defineNextConfig({
//   reactStrictMode: true,
//   swcMinify: true,
//   // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
//   i18n: {
//     locales: ["en"],
//     defaultLocale: "en",
//   },
//   webpack: function (config, options) {
//     config.experiments = { asyncWebAssembly: true };
//     return config;
//   },
// });

import rehypePrism from "rehype-prism-plus";

import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  webpack: function (config, options) {
    config.experiments = { asyncWebAssembly: true };
    return config;
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});

export default withMDX(nextConfig);
