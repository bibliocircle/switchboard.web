import { gql } from "@apollo/client";

export const CREATE_MOCK_SERVICE_TEMPLATE = gql`
  mutation CreateMockService($mockService: MockServiceInput!) {
    createMockService(mockService: $mockService) {
      id
      name
      type
    }
  }
`;
