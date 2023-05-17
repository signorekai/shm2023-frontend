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
  console.log('cache key', result.extensions.graphqlSmartCache.graphqlObjectCache.cacheKey)
  return result;
}

export const getImageUrl = (imageObj, minWidth) => {
  let selected = {
    url: imageObj.sourceUrl, 
    width: Number(imageObj.mediaDetails.width),
    height: Number(imageObj.mediaDetails.height)
  };

  if (!imageObj.mediaDetails.sizes) {
    return selected;
  } else {
    selected.url = imageObj.mediaDetails.sizes[0].sourceUrl;
    selected.width = Number(imageObj.mediaDetails.sizes[0].width);
    selected.height = Number(imageObj.mediaDetails.sizes[0].height);
  }

  for (let x=1; x<imageObj.mediaDetails.sizes.length; x++) {
    if (
      Number(imageObj.mediaDetails.sizes[x].width) >= minWidth && 
      Number(imageObj.mediaDetails.sizes[x].width) > selected.width 
    ) {
      selected.url = imageObj.mediaDetails.sizes[x].sourceUrl;
      selected.width = Number(imageObj.mediaDetails.sizes[x].width);
      selected.height = Number(imageObj.mediaDetails.sizes[x].height);
    }
  }

  return selected;
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
              sourceUrl
              mediaDetails {
                width
                height
                sizes {
                  width
                  sourceUrl
                  height
                }
              }
            }
          }
          productFields {
            credits
            price
            totalQuantity
            weight
            snipcartProductId
            shortDescription
            additionalDetails {
              tabContent
              tabTitle
            }
            images {
              sourceUrl
              mediaDetails {
                width
                height
                sizes {
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