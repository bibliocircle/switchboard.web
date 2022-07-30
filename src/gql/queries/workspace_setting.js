import { gql } from "@apollo/client";

export const GET_WORKSPACE_SETTING = gql`
  query GetWorkspaceSetting($workspaceId: String, $mockServiceId: String) {
    workspaceSetting(workspaceId: $workspaceId, mockServiceId: $mockServiceId) {
      id
      workspace {
        id
        name
        expiresAt
      }
      mockService {
        id
        name
        type
        upstreams {
          id
          name
          url
        }
      }
      config {
        injectHeaders {
          name
          value
        }
      }
      endpointConfigs {
        id
        endpoint {
          id
          method
          path
          description
        }
        scenarioConfigs {
          id
          scenario {
            id
            type
            httpResponseScenarioConfig {
              statusCode
              responseBodyTemplate
              responseHeadersTemplate
            }
            proxyScenarioConfig {
              upstream {
                id
                name
                url
              }
              injectHeaders {
                name
                value
              }
            }
            networkScenarioConfig {
              type
            }
          }
          isActive
        }
        responseDelay
      }
    }
  }
`;
