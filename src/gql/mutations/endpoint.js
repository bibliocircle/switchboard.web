import { gql } from "@apollo/client";

export const CREATE_ENDPOINT = gql`
  mutation CreateEndpoint($endpoint: EndpointInput!) {
    createEndpoint(endpoint: $endpoint) {
      id
      description
      method
      path
      responseDelay
      scenarios {
        id
      }
      createdAt
      updatedAt
      createdBy {
        firstName
      }
    }
  }
`;
