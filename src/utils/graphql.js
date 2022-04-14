/**
 *
 * @param {string} url
 * @param {object} headers
 * @param {string} query
 * @returns Promise
 */
export const fetchGraphQL = async (url, headers, query) => {
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ query: query }),
  });

  res = await res.json();
  return cleanGraphQLResponse(res);
};

/**
 * Remove edges, node and __typename from graphql response
 *
 * @param {Object} input - The graphql response
 * @returns {Object} Clean graphql response
 */
export const cleanGraphQLResponse = (input) => {
  if (!input) return null;

  const isPrimitiveType = (test) => {
    return test !== Object(test);
  };

  if (isPrimitiveType(input)) return input;

  const output = {};
  const isObject = (obj) => {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  };

  Object.keys(input).forEach((key) => {
    if (input[key] && input[key].edges) {
      output[key] = input[key].edges.map((edge) => cleanGraphQLResponse(edge.node));
    } else if (input[key] && input[key].nodes) {
      output[key] = input[key].nodes.map((node) => cleanGraphQLResponse(node));
    } else if (isObject(input[key])) {
      output[key] = cleanGraphQLResponse(input[key]);
    } else if (key !== '__typename') {
      output[key] = input[key];
    }
  });

  return output;
};
