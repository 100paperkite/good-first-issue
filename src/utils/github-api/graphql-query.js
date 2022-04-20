export const Query = {
  pageInfo() {
    return `{
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      }`;
  },

  issueNode(innerNode) {
    return `{
      number
      title
      titleHTML
      url
      id
      publishedAt
      updatedAt
      state
      labels(first: 5) {
          nodes {
          color
          name
          }
      }
      assignees(last: 1) {
          totalCount
      }
      comments(first:100){
          totalCount
      }
      ${innerNode || ''}
      }`;
  },

  repoNode() {
    return `{
      id
      url
      name
      owner {
        login
      }
      descriptionHTML
      stargazerCount
      forkCount
      languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
        edges {
          node {
            color
            name
          }
          size
        }
      }
    }`;
  },
};
