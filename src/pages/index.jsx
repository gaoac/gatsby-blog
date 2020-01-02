import React from 'react';
import { Link, graphql } from 'gatsby';
import dayjs from 'dayjs';
import { Clock, Tag } from 'react-feather';
import styled from 'styled-components';
import 'hover.css/css/hover-min.css';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { rhythm } from '../utils/typography';

const SCArticle = styled.article`
  padding: 10px 10px 20px 10px;
  &:hover {
    background: #effbff;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
  }
`;

const SCLink = styled(Link)`
  color: #394d69;
  box-shadow: none;
  text-decoration: none !important;
  &:hover {
    color: #48b2ff;
  }
  .hvr-underline-from-center {
    &::before {
      height: 2px;
    }
  }
  @media screen and (max-width: 500px) {
    .hvr-underline-from-center {
      display: contents;
    }
  }
`;

const SCSmall = styled.small`
  display: block;
  margin: 10px 0 20px;
`;

const SCButton = styled.div`
  text-align: center;
`;
const SCButtonLink = styled(Link)`
  text-decoration: none !important;
  background-color: #fff;
  border: 1px solid #da552f;
  display: inline-block;
  padding: 4px 10px;
  color: #da552f;

  @media screen and (max-width: 500px) {
    display: contents;
  }
`;
class BlogIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        {/* <Bio /> */}
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          const tags = node.frontmatter.tags || [];
          return (
            <SCArticle key={node.fields.slug}>
              <header className="blog-index-header">
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <SCLink className="hvr-underline-from-center" to={node.fields.slug}>
                    {title}
                  </SCLink>
                </h3>
                <SCSmall>
                  <Clock size={16} style={{ verticalAlign: 'middle' }} />
                  &nbsp;
                  <span style={{ verticalAlign: 'sub' }}>
                    {dayjs(node.frontmatter.date).format('YYYY-MM-DD')}
                  </span>
                  &nbsp; &nbsp;
                  <Tag size={16} style={{ verticalAlign: 'middle' }} />
                  &nbsp;
                  <span style={{ verticalAlign: 'sub' }}>{tags.join(' ')}</span>
                </SCSmall>
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
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
            tags
          }
        }
      }
    }
  }
`;
