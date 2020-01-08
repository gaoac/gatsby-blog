import React from 'react';

// Utilities
// eslint-disable-next-line import/no-extraneous-dependencies
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';

// Components
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { Tag, Badge } from 'antd';
import Layout from '../components/Layout';
import { getTagColor } from '../utils/utils';

const SCTags = styled.div`
  text-align: center;
  .ant-badge-count {
    z-index: 0;
  }
`;
const SCLink = styled(Link)``;
const SCBadge = styled(Badge)`
  margin: 6px 10px !important;
  .ant-tag {
    a {
      color: inherit;
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
      <SCTags>
        {group.map((tag, index) => (
          <SCBadge count={tag.totalCount}>
            <Tag color={getTagColor(tag.totalCount, index)}>
              <SCLink to={`/tags/${kebabCase(tag.fieldValue)}/`}>{tag.fieldValue}</SCLink>
            </Tag>
          </SCBadge>
        ))}
      </SCTags>
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
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
