export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
export const FRONTEND_URL =
  process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
export const CONSUMER_BACKEND_API_PORT = 9999
export const AUTH_COOKIE_NAME = "sb_auth"
export const THEME_COOKIE_NAME = "sb_theme";

export const MOCK_SERVICE_TYPE_MAP = {
  REST: "REST API",
  GRAPHQL: "GraphQL API"
}

export const SCENARIO_TYPE_MAP = {
  HTTP_RESPONSE: "Respond",
  PROXY: "Proxy",
  NETWORK: "Network",
}