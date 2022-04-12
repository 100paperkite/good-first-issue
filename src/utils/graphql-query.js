/**
 *
 * @param {number} count - number of issues to fetch
 * @param {string} name - name of the repository
 * @param {string} owner - owner of the repository
 * @param {{string, string}} pageCursor - cursor to fetch next page
 * @returns
 */
export const getAllIssuesByRepository = (name, owner, count = 15, { before, after }) => {
  return `
        repository(name: "${name}", owner: "${owner}") {
          label(name: "good-first-issue") {
            issues(
              first: ${count}
              after: null
              filterBy: {assignee: null, states: OPEN}
              orderBy: {field: UPDATED_AT, direction: DESC}
              ${before ? `before: "${before}"` : ''}
              ${after ? `after: "${after}"` : ''}
            ) {
              totalCount
              pageInfo {
                startCursor
                hasNextPage
                endCursor
              }
              edges {
                node {
                  number
                  title
                  resourcePath
                  url
                  state
                  labels(first: 5) {
                    edges {
                      node {
                        name
                      }
                    }
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
export const searchIssueByLanguage = (
  language,
  sortOrder = 'updated',
  count = 15,
  { before, after } = {}
) => {
  return `
  query {
    search(
        first: ${count}
        ${before ? `before: "${before}"` : ''}
        ${after ? `after: "${after}"` : ''}
        type: ISSUE
        query: "label:\\"good first issue\\",good-first-issue 
        ${language ? `language:${language}` : ''} 
        state:open sort:${sortOrder}-desc"
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
