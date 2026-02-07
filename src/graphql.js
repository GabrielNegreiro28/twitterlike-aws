export const createPost = /* GraphQL */ `
  mutation CreatePost($content: String!) {
    createPost(content: $content) {
      id
      content
      author
      createdAt
    }
  }
`;

export const listGlobalFeed = /* GraphQL */ `
  query ListGlobalFeed($limit: Int) {
    listGlobalFeed(limit: $limit) {
      id
      content
      author
      createdAt
    }
  }
`;
