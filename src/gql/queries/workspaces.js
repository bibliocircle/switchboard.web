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

export const GET_USER_WORKSPACES = gql`
  query GetWorkspaces {
    userWorkspaces {
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

export const GET_USER_WORKSPACE = gql`
  query GetUserWorkspace($workspaceId: String) {
    userWorkspace(workspaceId: $workspaceId) {
      id
      name
      mockServices {
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
      createdAt
      expiresAt
      createdBy {
        firstName
        lastName
      }
    }
  }
`;
