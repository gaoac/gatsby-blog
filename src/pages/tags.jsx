import React from 'react';

// Utilities
// eslint-disable-next-line import/no-extraneous-dependencies
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';

// Components
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const SCLink = styled(Link)`
  text-decoration: none !important;
  &.hvr-underline-from-center {
    &::before {
      height: 2px;
    }
  }
`;

const TagsPage = ({
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
      <h1>标签</h1>
      <ul>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <SCLink
              to={`/tags/${kebabCase(tag.fieldValue)}/`}
              className="hvr-underline-from-center"
            >
              {tag.fieldValue} ({tag.totalCount})
            </SCLink>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
