/* eslint-disable react/no-danger */
import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { rhythm, scale } from '../utils/typography';

import './blog-post.less';

class BlogPostTemplate extends React.Component {
  ticking = false;

  textContent = '';

  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          const { scrollTop } = document.documentElement;
          const title = document.querySelectorAll('#article a');
          const titleArray = [].slice.call(title);
          const tocTitle = document.querySelectorAll('#toc-affix li a');
          const tocTitleArray = [].slice.call(tocTitle);
          titleArray.map(item => {
            if (item.parentNode.offsetTop <= scrollTop) {
              const { textContent } = item.parentNode;
              this.textContent = textContent;
            }
            return item;
          });

          tocTitleArray.map(item => {
            item.classList.remove('active');
            return item;
          });
          tocTitleArray.map(item => {
            if (item.textContent.toLocaleLowerCase() === this.textContent.toLocaleLowerCase()) {
              item.classList.add('active');
            }
            return item;
          });

          this.ticking = false;
        });
      }
      this.ticking = true;
    });
  }

  render() {
    const {
      data: {
        markdownRemark: {
          frontmatter: { date, tags, title, description },
          excerpt,
          html,
          tableOfContents,
        },
        site: {
          siteMetadata: { title: siteTitle },
        },
      },
      pageContext: { previous, next },
      location,
    } = this.props;

    const theTags = tags || [];

    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={title} description={description || excerpt} />
        <article>
          <header className="header">
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {date}
              &nbsp;
              {theTags.join(' ')}
            </p>
          </header>
          <section id="article" dangerouslySetInnerHTML={{ __html: html }} />
          <div id="toc-affix" className="toc-affix">
            <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
          </div>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`;
