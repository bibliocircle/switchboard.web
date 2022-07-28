import { gql } from "@apollo/client";

export const GET_MOCK_SERVICES = gql`
  query GetMockServices {
    mockServices {
      id
      name
      type
      createdBy {
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_MOCK_SERVICE_BY_ID = gql`
  query GetMockService($id: String) {
    mockService(id: $id) {
      id
      name
      type
      config {
        injectHeaders {
          name
          value
        }
        globalResponseDelay
      }
      createdBy {
        ...userFields
      }
      upstreams {
        id
        name
        url
        createdBy {
          ...userFields
        }
        createdAt
        updatedAt
      }
      endpoints {
        id
        method
        path
        description
        responseDelay
        scenarios {
          id
          type
          httpResponseScenarioConfig {
            responseHeadersTemplate
            responseBodyTemplate
            statusCode
          }
          networkScenarioConfig {
            type
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
              createdBy {
                ...userFields
              }
              createdAt
              updatedAt
            }
          }
        }
        createdBy {
          ...userFields
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }

  fragment userFields on User {
    id
    firstName
    lastName
  }
`;
