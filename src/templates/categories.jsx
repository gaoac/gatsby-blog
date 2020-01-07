import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';

const SCLink = styled(Link)`
  text-decoration: none !important;
  &.hvr-underline-from-center {
    &::before {
      height: 2px;
    }
  }
`;

// Components

const CategorieTemplate = ({ pageContext, data }) => {
  const { categorie } = pageContext;
  const {
    site: {
      siteMetadata: { title: siteTitle },
    },
    allMarkdownRemark,
  } = data;
  const { edges, totalCount } = allMarkdownRemark;
  const tagHeader = `${totalCount}篇文章关于"${categorie}"`;
  return (
    <Layout title={siteTitle}>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields;
          const { title } = node.frontmatter;
          return (
            <li key={slug}>
              <SCLink to={slug} className="hvr-underline-from-center">
                {title}
              </SCLink>
            </li>
          );
        })}
      </ul>
      <SCLink to="/categories">全部分类</SCLink>
    </Layout>
  );
};

export default CategorieTemplate;

export const pageQuery = graphql`
  query($categorie: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$categorie] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
