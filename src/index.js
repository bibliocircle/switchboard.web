import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import Application from "./Application";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { BACKEND_URL } from "./config";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    onError(({ graphQLErrors }) => {
      if (graphQLErrors) {
        // Redirect user back to login if user needs to re-authenticate
        const requireReAuth = graphQLErrors.some(
          ({ extensions }) => extensions?.code === "UNAUTHORISED"
        );

        console.log(graphQLErrors);
        if (requireReAuth) {
          try {
            const redirectPath = window.location.href.replace(
              window.location.origin,
              ""
            );
            const loginPath = `/login?redirectPath=${encodeURIComponent(
              redirectPath
            )}`;
            window.location.href = new URL(
              loginPath,
              window.location.origin
            ).toString();
          } catch (err) {
            window.location.pathname = "/login";
          }
        }
      }
    }),
    new HttpLink({
      uri: `${BACKEND_URL}/graphql`,
      credentials: "include",
    }),
  ]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Application />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
