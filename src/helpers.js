import { JSDOM } from "jsdom";

export const fetchGQL = async (query, variables = {}) => {
  const url = import.meta.env.BACKEND_URL;
  const response = await fetch(`${url}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables
    }),
  });

  const result = await response.json();
  if (result.errors) {
    console.log(JSON.stringify(result.errors, false, '  '));
    throw new Error("Error with GraphQL query");
  }
  // console.log('cache key', result.extensions.graphqlSmartCache.graphqlObjectCache.cacheKey)
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

export const wrapWithVercelImageOpt = (url) => { 
  if (import.meta.env.PROD) {
    return(`/_vercel/image?url=${encodeURIComponent(url)}&q=100&w=1500`) 
  } else {
    return(url);
  }
};

export const processVercelImage = (content) => {
  if (import.meta.env.PROD)  {
  // if (true)  {
    const dom = new JSDOM(content);
    const { document } = dom.window;
    
    document.querySelectorAll('img').forEach((item) => {
      const originalSrc = item.getAttribute('src');
      item.setAttribute('src', wrapWithVercelImageOpt(originalSrc))

      let srcset = item.getAttribute('srcset');
      if (srcset) {
        srcset = srcset.split(', ').map(source => {
          const srcset = source.split(' ');
          return srcset.length === 1 ? wrapWithVercelImageOpt(srcset[0]) : `${wrapWithVercelImageOpt(srcset[0])} ${srcset[1]}`;
        }).join(', ');
        item.setAttribute('srcset', srcset);
      }
    })
  
    return dom.serialize();
  } else {
    return content;
  }
}

export const getNodeByURL = async (url) => {
  const { data } = await fetchGQL(`
    query GetNodeByURI($uri: String!) {
      desktopNav: menu(id: "Desktop Menu", idType: NAME) {
        menuItems {
          nodes {
            target
            uri
            label
            menuItemFields{
              cssClasses
              hoverGifWidth
              hoverGifLeftMargin
              hoverGif {
                sourceUrl
              }
            }
          }
        }
      }
      mobileNav: menu(id: "Mobile Menu", idType: NAME) {
        menuItems {
          nodes {
            target
            uri
            label
          }
        }
      }
      footerNav: menu(id: "Footer Menu", idType: NAME) {
        menuItems {
          nodes {
            target
            uri
            label
          }
        }
      }
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
        ... on ContentType {
          id
          name
          contentNodes(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
            edges {
              node {
                slug
                ... on Person {
                  id
                  title
                  peopleFields {
                    bio
                    jobTitle
                  }
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
                }
              }
            }
          }
        }
        ... on Product {
          id
          template {
            templateName
          }
          slug
          title
          seo {
            description
            image {
              sourceUrl(size: SOCIAL_MEDIA)
            }
          }
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
          pageFields {
            footerCtaBar {
              linkLabel
              nextPage {
                ... on Page {
                  id
                  slug
                }
              }
              subtitle
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
          enqueuedStylesheets {
            edges {
              node {
                id
                src
                version
              }
            }
          }
          enqueuedScripts {
            edges {
              node {
                id
                src
                version
              }
            }
          }
        }
        ... on Project {
          id
          title
          slug
          seo {
            description
            image {
              sourceUrl(size: SOCIAL_MEDIA)
            }
          }
          pageFields {
            footerCtaBar {
              linkLabel
              nextPage {
                ... on Page {
                  id
                  slug
                }
              }
              subtitle
            }
          }
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
            callToAction {
              target
              title
              url
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
          pageFields {
            footerCtaBar {
              linkLabel
              nextPage {
                ... on Page {
                  id
                  slug
                }
              }
              subtitle
            }
          }
        }
        ... on Page {
          id
          title
          slug
          seo {
            description
            image {
              sourceUrl(size: SOCIAL_MEDIA)
            }
          }
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
          enqueuedStylesheets {
            edges {
              node {
                id
                src
                version
              }
            }
          }
          enqueuedScripts {
            edges {
              node {
                id
                src
                version
              }
            }
          }
          pageFields {
            footerCtaBar {
              linkLabel
              nextPage {
                ... on Page {
                  id
                  slug
                }
              }
              subtitle
            }
          }
          content(format: RENDERED)
          template {
            templateName
            ... on Template_People {
              templateName
              peoplePage {
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
              }
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