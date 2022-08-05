import { gql } from "@apollo/client";

export const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($workspace: WorkspaceInput!) {
    createWorkspace(workspace: $workspace) {
      id
    }
  }
`;

export const ADD_MOCK_SERVICE_TO_WORKSPACE = gql`
  mutation AddMockServiceToWorkspace(
    $workspaceId: String!
    $mockServiceId: String!
  ) {
    addMockServiceToWorkspace(
      workspaceId: $workspaceId
      mockServiceId: $mockServiceId
    ) {
      id
    }
  }
`;
