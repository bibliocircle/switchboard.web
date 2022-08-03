import { gql } from "@apollo/client";

export const CREATE_SCENARIO = gql`
  mutation CreateScenario($scenario: ScenarioInput!) {
    createScenario(scenario: $scenario) {
      id
      httpResponseScenarioConfig {
        responseBodyTemplate
        responseHeadersTemplate
        statusCode
      }
      proxyScenarioConfig {
        injectHeaders {
          name
          value
        }
        upstream {
          id
          name
          url
        }
      }
      networkScenarioConfig {
        type
      }
    }
  }
`;
