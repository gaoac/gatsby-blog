import React from 'react';
import { Link, navigate, graphql } from 'gatsby';
import { Tag, Divider, Pagination } from 'antd';
import { Calendar as IconCalendar, Tag as IconTag, Folder as IconFolder } from 'react-feather';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'hover.css/css/hover-min.css';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { rhythm, scale } from '../utils/typography';
import { getTagColor } from '../utils/utils';

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

const SCPagination = styled(Pagination)`
  display: flex;
  justify-content: flex-end;
`;

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  const tagsArray = data.tagsGroup.group;
  const categoriesArray = data.categoriesGroup.group;
  const tagsArrayLength = tagsArray.length;
  const categoriesArrayLength = categoriesArray.length;
  const tagsColorObj = {};
  const categoriesColorObj = {};
  tagsArray.forEach((element, index) => {
    tagsColorObj[element.fieldValue] = getTagColor(tagsArrayLength, index);
  });
  categoriesArray.forEach((element, index) => {
    categoriesColorObj[element.fieldValue] = getTagColor(categoriesArrayLength, index);
  });
  const onChange = page => {
    navigate(`blog/${page}`);
  };
  debugger;
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
                  <IconCalendar size={16} />
                  发表于 {dayjs(node.frontmatter.date).format('YYYY-MM-DD')}
                </SCLabel>
                {tags && tags.length ? (
                  <SCLabel>
                    <Divider type="vertical" />
                    <IconTag size={16} />
                    {tags.map(text => (
                      <Tag color={tagsColorObj[text]}>{text}</Tag>
                    ))}
                  </SCLabel>
                ) : null}
                {categories && categories.length ? (
                  <SCLabel>
                    <Divider type="vertical" />
                    <IconFolder size={16} />
                    {categories.map(text => (
                      <Tag color={categoriesColorObj[text]}>{text}</Tag>
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
      <SCPagination
        defaultCurrent={1}
        total={data.allMarkdownRemark.totalCount}
        pageSize={10}
        onChange={onChange}
      />
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 10, skip: 0) {
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
      totalCount
    }
    tagsGroup: allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
    categoriesGroup: allMarkdownRemark {
      group(field: frontmatter___categories) {
        fieldValue
      }
    }
  }
`;
