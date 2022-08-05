import { gql } from "@apollo/client";

export const ACTIVATE_MOCK_SERVICE_SCENARIO = gql`
  mutation ActivateMockServiceScenario(
    $workspaceId: String!
    $mockServiceId: String!
    $endpointId: String!
    $scenarioId: String!
  ) {
    activateMockServiceScenario(
      workspaceId: $workspaceId
      mockServiceId: $mockServiceId
      endpointId: $endpointId
      scenarioId: $scenarioId
    ) {
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
`;
