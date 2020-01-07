import React from 'react';
import { Link, graphql } from 'gatsby';
import { Tag, Divider } from 'antd';
import { Clock as IconClock, Tag as IconTag, Folder as IconFolder } from 'react-feather';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'hover.css/css/hover-min.css';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { rhythm, scale } from '../utils/typography';

import theme from '../theme/default';

const SCArticle = styled.article`
  padding: 10px 10px 20px 10px;
  border: 1px solid ${theme['@custom-article-border']};
  margin: 0 0 18px 0;
  &:hover {
    background: ${theme['@custom-article-hover-background']};
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
    .ant-divider {
      background: ${theme['@primary-color']};
    }
  }
`;

const SCH3 = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
  @media screen and (max-width: 500px) {
    text-align: center;
  }
`;

const SCLink = styled(Link)`
  color: ${theme['@text-color']};
  box-shadow: none;
  text-decoration: none !important;
  &:hover {
    color: ${theme['@primary-color']};
  }
`;

const SCLabel = styled.span`
  svg {
    margin-right: 8px;
    vertical-align: -0.25em;
  }
`;

const SCButton = styled.div`
  text-align: center;
`;
const SCButtonLink = styled(Link)`
  text-decoration: none !important;
  background-color: ${theme['@body-background']};
  border: 1px solid ${theme['@primary-color']};
  display: inline-block;
  padding: 4px 10px;
  color: ${theme['@primary-color']};
  &:hover {
    color: ${theme['@primary-color']};
  }

  @media screen and (max-width: 500px) {
    display: contents;
  }
`;

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        const tags = node.frontmatter.tags || [];
        const categories = node.frontmatter.categories || [];
        return (
          <SCArticle key={node.fields.slug}>
            <header>
              <SCH3>
                <SCLink to={node.fields.slug}>{title}</SCLink>
              </SCH3>
              <Divider />
              <p
                style={{
                  ...scale(-1 / 5),
                  display: `block`,
                  marginBottom: rhythm(1),
                }}
              >
                <SCLabel>
                  <IconClock size={16} />
                  {dayjs(node.frontmatter.date).format('YYYY-MM-DD')}
                </SCLabel>
                {tags && tags.length ? (
                  <SCLabel>
                    <Divider type="vertical" />
                    <IconTag size={16} />
                    {tags.map(text => (
                      <Tag>{text}</Tag>
                    ))}
                  </SCLabel>
                ) : null}
                {categories && categories.length ? (
                  <SCLabel>
                    <Divider type="vertical" />
                    <IconFolder size={16} />
                    {categories.map(text => (
                      <Tag>{text}</Tag>
                    ))}
                  </SCLabel>
                ) : null}
              </p>
            </header>
            <section>
              <p
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              <SCButton>
                <SCButtonLink className="hvr-grow-shadow" to={node.fields.slug}>
                  阅读全文 »
                </SCButtonLink>
              </SCButton>
            </section>
          </SCArticle>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
            tags
            categories
          }
        }
      }
    }
  }
`;
