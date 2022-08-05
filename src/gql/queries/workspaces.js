import { gql } from "@apollo/client";

export const GET_WORKSPACES = gql`
  query GetWorkspaces {
    workspaces {
      id
      name
      createdAt
      expiresAt
      createdBy {
        firstName
        lastName
      }
    }
  }
`;

export const GET_WORKSPACE_DETAILS = gql`
  query GetWorkspaceDetails($workspaceId: String!) {
    workspace(id: $workspaceId) {
      id
      name
      createdAt
      updatedAt
      createdBy {
        id
        firstName
        lastName
      }
    }
    workspaceSettings(workspaceId: $workspaceId) {
      id
      mockService {
        id
        name
        type
        config {
          injectHeaders {
            name
            value
          }
        }
        createdBy {
          firstName
          lastName
        }
        createdAt
        updatedAt
      }
    }
  }
`;
