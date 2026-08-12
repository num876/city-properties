// API client for headless WordPress using GraphQL
import { GraphQLClient, gql } from 'graphql-request';

// Change this URL to your headless WordPress GraphQL endpoint
const endpoint = 'https://cityproperties-oxford.co.uk/graphql';

export const client = new GraphQLClient(endpoint);

export const GET_SITE_METADATA = gql`
  query GetSiteMeta {
    generalSettings {
      title
      description
    }
  }
`;

export const GET_PROPERTIES = gql`
  query GetProperties {
    properties(first: 20) {
      edges {
        node {
          id
          title
          excerpt
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export const GET_PROPERTY_BY_SLUG = gql`
  query GetPropertyBySlug($slug: String!) {
    propertyBy(slug: $slug) {
      id
      title
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;
