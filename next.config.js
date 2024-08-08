
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
    }
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

