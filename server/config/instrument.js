// Import with `import * as Sentry from "@sentry/node"` if you are using ESM

import * as Sentry from "@sentry/node"

import {nodeProfilingIntegration} from "@sentry/profiling-node";
Sentry.init({
  dsn: "https://622a6d90b99bc8dfdac4e7dec8347da8@o4509178870431744.ingest.us.sentry.io/4509178874691584",
  integrations:[
    nodeProfilingIntegration(),
    Sentry.mongoIntegration()
  ],

//   tracesSampleRate: 1.0,

});

Sentry.profiler.startProfiler();

Sentry.startSpan({
    name: "My First Transaction",

}, () => {

})

Sentry.profiler.startProfiler();