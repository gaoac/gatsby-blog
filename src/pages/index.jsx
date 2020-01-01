import React from 'react';
import { Link, graphql } from 'gatsby';
import dayjs from 'dayjs';
import '../../static/iconfont';
import 'hover.css/css/hover-min.css';
import './index.less';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Icon from '../components/Icon';
import { rhythm } from '../utils/typography';

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
            <article key={node.fields.slug} className="blog-acticle">
              <header className="blog-index-header">
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link
                    className="blog-index-title hvr-underline-from-center"
                    style={{ boxShadow: `none` }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </h3>
                <small className="post-meta">
                  <Icon type="icon-time" />
                  &nbsp;
                  {dayjs(node.frontmatter.date).format('YYYY-MM-DD')}
                  &nbsp; &nbsp;
                  <Icon type="icon-tag" />
                  &nbsp;
                  {tags.join(' ')}
                </small>
              </header>
              <section>
                <p
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
                <div className="post-button">
                  <Link
                    className="btn hvr-grow-shadow"
                    style={{ boxShadow: `none` }}
                    to={node.fields.slug}
                  >
                    阅读全文 »
                  </Link>
                </div>
              </section>
            </article>
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
