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
  if (result.errors) {
    console.log(result.errors);
    throw new Error("Error with GraphQL query");
  }
  console.log('cache key', result.extensions.graphqlSmartCache.graphqlObjectCache.cacheKey)
  return result;
}

export const getImageUrl = (imageObj, minWidth) => {
  if (imageObj === null || imageObj.hasOwnProperty('sourceUrl') === false) {
    return false;
  }

  
  if (!imageObj.mediaDetails.sizes) {
    return {
      url: imageObj.sourceUrl, 
      width: Number(imageObj.mediaDetails.width),
      height: Number(imageObj.mediaDetails.height)
    };
  } else {
    let selected = {
      url: '',
      width: 0,
      height: 0,
    };

    for (let x=0; x<imageObj.mediaDetails.sizes.length; x++) {
      if (
        Number(imageObj.mediaDetails.sizes[x].width) >= minWidth && 
        (Number(imageObj.mediaDetails.sizes[x].width) < selected.width  || selected.width === 0)
      ) {
        selected.url = imageObj.mediaDetails.sizes[x].sourceUrl;
        selected.width = Number(imageObj.mediaDetails.sizes[x].width);
        selected.height = Number(imageObj.mediaDetails.sizes[x].height);
      }
    }

    if (selected.width === 0) {
      return {
        url: imageObj.sourceUrl, 
        width: Number(imageObj.mediaDetails.width),
        height: Number(imageObj.mediaDetails.height)
      };
    }

    return selected;
  }
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
          additionalProductFields {
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
        ... on Project {
          id
          title
          slug
          featuredImage {
            node {
              sourceUrl
              mediaDetails {
                width
                height
                sizes {
                  sourceUrl
                  height
                  width
                }
              }
            }
          }
          excerpt
          projectCredits {
            bylineGroup {
              byline
              bylineLabel
            }
          }
          projectFields {
            content
            coverImage {
              sourceUrl
              mediaDetails {
                width
                height
                sizes {
                  height
                  width
                  sourceUrl
                }
              }
            }
            footerImage {
              sourceUrl
              mediaDetails {
                width
                height
                sizes {
                  height
                  width
                  sourceUrl
                }
              }
            }
            images {
              sourceUrl
              mediaDetails {
                width
                height
                sizes {
                  sourceUrl
                  width
                  height
                }
              }
            }
            relatedProduct {
              productId {
                ... on Product {
                  id
                  slug
                }
              }
              linkLabel
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
        
  console.log(183, data);

  return data;
}