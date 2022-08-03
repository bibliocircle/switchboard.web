import { gql } from "@apollo/client";

export const CREATE_UPSTREAM = gql`
  mutation CreateUpstream($upstream: UpstreamInput!) {
    createUpstream(upstream: $upstream) {
      id
      name
      url
    }
  }
`;
