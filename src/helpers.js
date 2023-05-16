export const fetchGQL = async (query, variables = {}) => {
  const url = import.meta.env.BACKEND_URL;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables
    }),
  });

  const result = await response.json();
  console.log(JSON.stringify( result.extensions.graphqlSmartCache, false, '  '));
  return result;
}

export const getNodeByURL = async (url) => {
  const { data } = await fetchGQL(`
    query GetNodeByURI($uri: String!) {
      nodeByUri(uri: $uri) {
        __typename
        isContentNode
        isTermNode
        ... on Page {
          id
          title
          template {
            templateName
          }
        }
        ... on Product {
          id
          template {
            templateName
          }
          slug
          title
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              mediaDetails {
                width
                height
              }
            }
          }
          productFields {
            credits
            price
            totalQuantity
            weight
            additionalDetails {
              tabContent
              tabTitle
            }
            images {
              mediaDetails {
                sizes(include: LARGE) {
                  width
                  sourceUrl
                  height
                }
              }
            }
          }
        }
        ... on Post {
          id
          title
          date
          uri
          excerpt
          content
          categories {
            nodes {
              name
              uri
            }
          }
          featuredImage {
            node {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  `,
 {
    uri: url
}
  );

  return data;
}