import React from 'react';

// Utilities
// eslint-disable-next-line import/no-extraneous-dependencies
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';

// Components
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import theme from '../theme/default';

const SCLink = styled(Link)`
  text-decoration: none !important;
  &.hvr-underline-from-center {
    &::before {
      height: 2px;
      background: ${theme['@primary-color']};
    }
  }
`;

const CategoriesPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout title={title}>
    <Helmet title={title} />
    <div>
      <h1>分类</h1>
      <ul>
        {group.map(categorie => (
          <li key={categorie.fieldValue}>
            <SCLink
              to={`/categories/${kebabCase(categorie.fieldValue)}/`}
              className="hvr-underline-from-center"
            >
              {categorie.fieldValue} ({categorie.totalCount})
            </SCLink>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default CategoriesPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
