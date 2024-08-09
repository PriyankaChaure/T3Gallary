
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const coreConfig = {
    images:{
        remotePatterns : [{hostname : "utfs.io"}],
    },
    typescript  :{
        ignoreBuildErrors:true
    },
    eslint:{
        ignoreDuringBuilds:true
    },
    async rewrites() {
      return [
        {
          source: "/ingest/static/:path*",
          destination: "https://us-assets.i.posthog.com/static/:path*",
        },
        {
          source: "/ingest/:path*",
          destination: "https://us.i.posthog.com/:path*",
        },
        {
          source: "/ingest/decide",
          destination: "https://us.i.posthog.com/decide",
        },
      ];
    },
};

import { withSentryConfig } from "@sentry/nextjs";

const config = withSentryConfig(
  coreConfig,
  {
   
    org: "droit-cloud",
    project: "javascript-nextjs",
    silent: !process.env.CI,
  },
  // @ts-ignore
  {
   
    widenClientFileUpload: true,

   
    transpileClientSDK: true,

   
    tunnelRoute: "/monitoring",

   
    hideSourceMaps: true,

 
    disableLogger: true,

   
    automaticVercelMonitors: true,
  },

  
);

export default config;

