import { Query } from './graphql-query';

const GOOD_FIRST_ISSUE_LABEL = '\\"good first issue\\",good-first-issue';

export class GitHubApi {
  constructor(token) {
    this.token = token;
  }
  async request({ query }) {
    try {
      const url = `https://api.github.com/graphql`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `token ${this.token}`,
      };
      const body = JSON.stringify({ query });

      let response = await fetch(url, { method: 'POST', headers, body });
      response = await response.json();

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }
      return response;
    } catch (err) {
      console.error(err);
      return {
        data: null,
      };
    }
  }

  objectToQueryParams(object) {
    return Object.entries(object)
      .filter(([k, v]) => v)
      .map(([k, v]) => `${k}:${v}`)
      .join(' ');
  }

  async searchIssuesWithRepo({ count, from = null, queryParams }) {
    const _queryParams = { ...queryParams, label: GOOD_FIRST_ISSUE_LABEL, state: 'open' };

    const query = `query {
          search(
              first: ${count}
              ${from ? `after: "${from}"` : ''}
              type: ISSUE
              query: "${this.objectToQueryParams(_queryParams)}"
          ) {
              pageInfo ${Query.pageInfo()}
              edges {
                  node {
                      ... on Issue ${Query.issueNode(`repository ${Query.repoNode()}`)}
                  }
              }
            }
        }
          `;
    const res = await this.request({ count, from, query });

    return {
      data: res.data?.search.edges,
      nextCursor: res.data?.search.pageInfo.endCursor,
      hasNextPage: res.data?.search.pageInfo.hasNextPage,
    };
  }

  async searchIssues({ count, from = null, queryParams }) {
    const _queryParams = { ...queryParams, label: GOOD_FIRST_ISSUE_LABEL, state: 'open' };
    const query = `query {
          search(
              first: ${count}
              ${from ? `after: "${from}"` : ''}
              type: ISSUE
              query: "${this.objectToQueryParams(_queryParams)}"
          ) {
              pageInfo ${Query.pageInfo()}
              edges {
                  node {
                      ... on Issue ${Query.issueNode()}
                  }
              }
            }
        }
          `;

    const res = await this.request({ count, from, query });

    return {
      data: res.data?.search.edges,
      nextCursor: res.data?.search.pageInfo.endCursor,
      hasNextPage: res.data?.search.pageInfo.hasNextPage,
    };
  }
}
