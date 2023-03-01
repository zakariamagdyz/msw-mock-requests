import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

let appReady = Promise.resolve();

// Enable API mocking only in development
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  appReady = worker.start({
    serviceWorker: {
      /**
       * Use a custom Service Worker script URL to resolve
       * the mock worker served by Codesandbox.
       * @note You DO NOT need this in your application.
       * @see https://mswjs.io/docs/api/setup-worker/start#serviceworker
       */
      url: "/mockServiceWorker.js"
    }
  });
}

/**
 * Use deferred application mounting in order to work in a sandbox.
 * You MAY NOT need this in your application.
 * @see https://mswjs.io/docs/recipes/deferred-mounting
 */
appReady.then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
