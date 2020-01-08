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
`;
const SCLink = styled(Link)``;
const SCBadge = styled(Badge)`
  margin: 0 10px !important;
  .ant-tag {
    a {
      color: inherit;
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
      <SCTags>
        {group.map((categorie, index) => (
          <SCBadge count={categorie.totalCount}>
            <Tag color={getTagColor(categorie.totalCount, index)}>
              <SCLink to={`/categories/${kebabCase(categorie.fieldValue)}/`}>
                {categorie.fieldValue}
              </SCLink>
            </Tag>
          </SCBadge>
        ))}
      </SCTags>
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
    allMarkdownRemark {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
