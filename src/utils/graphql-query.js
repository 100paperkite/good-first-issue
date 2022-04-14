const GOOD_FIRST_ISSUE_LABEL = '\\"good first issue\\",good-first-issue';

export const searchIssueByRepo = ({
  repo: { name, owner },
  sortOrder = 'created',
  count = 5,
  pageInfo: { before, after } = {},
}) => {
  return `
    query {
      search(
        first: ${count}
        ${before ? `before: "${before}"` : ''}
        ${after ? `after: "${after}"` : ''}
        type: ISSUE
        query: "label:${GOOD_FIRST_ISSUE_LABEL} repo:${owner}/${name} sort:${sortOrder}-desc state:open"
      ) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          node {
            ... on Issue {
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
            }
          }
        }
      }
    }
  `;
};

/**
 *
 * @param {number} count - number of issues to fetch
 * @param {string} language - language name
 * @param {string} sortOrder - updated | created | comments
 * @param {{string, string}} pageCursor - cursor to fetch next page
 * @returns
 */
export const searchIssueByLanguage = ({
  language,
  sortOrder = 'created',
  count = 15,
  pageInfo: { before, after } = {},
}) => {
  return `
  query {
    search(
        first: ${count}
        ${before ? `before: "${before}"` : ''}
        ${after ? `after: "${after}"` : ''}
        type: ISSUE
        query: "
          label:${GOOD_FIRST_ISSUE_LABEL}
          ${language ? `language:${language}` : ''} 
          state:open sort:${sortOrder}-desc
          "
      ) {
        pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        edges {
          node {
            ... on Issue {
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
              repository {
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
              }
            }
          }
        }
      }
    }`;
};
