window.process = {
  env: {
    NODE_ENV: 'production', // or 'development', depending on your environment
  },
  versions: {}, // Optional, in case the library is checking versions
};
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import React, { Suspense } from "react";
import { Provider } from "react-redux";

import { store } from "./store/Store";
import Spinner from "./views/spinner/Spinner";
import "./_mockApis";
import "./utils/i18n";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";
import { InfinityWallet } from "@connect2ic/core/providers/infinity-wallet";
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet";

import { createClient } from "@connect2ic/core";
import { Connect2ICProvider } from "@connect2ic/react";
import "@connect2ic/core/style.css";
import { UserProvider } from "./userContext/UserContext";
const client = createClient({
  providers: [new InternetIdentity()],
  // canisters: {
  //   myCanister
  // }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <Provider store={store}>
        <Suspense fallback={<Spinner />}>
          <Connect2ICProvider client={client}>
            <App />
          </Connect2ICProvider>
        </Suspense>
      </Provider>
    </UserProvider>
  </React.StrictMode>
);
