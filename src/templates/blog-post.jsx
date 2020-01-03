/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import dayjs from 'dayjs';
import Gitalk from 'gitalk';
import { Clock as IconClock, Tag as IconTag } from 'react-feather';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Tag from '../components/Tag';
import { rhythm, scale } from '../utils/typography';

import 'gitalk/dist/gitalk.css';

const SCHeader = styled.header``;

const SCLabel = styled.span`
  display: inline-flex;
  align-items: center;
`;

const SCSection = styled.section`
  text-align: justify;
  td,
  th {
    padding: 8px;
  }
  .line-numbers-rows {
    left: 10px !important;
  }
`;

const SCTocAffix = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  width: 240px;
  height: 80vh;
  max-height: calc(100vh - 80px);
  font-size: 14px;
  overflow-x: hidden;
  div {
    > ul {
      border-left: 1px solid #d2d2d2;
    }
  }
  ul {
    color: #555;
    margin-left: 0;
    li {
      list-style: none;
      margin-bottom: 0;
      > ul {
        margin-left: 0.9rem;
        margin-top: 0;
        margin-bottom: 0;
      }
      > p {
        margin-top: 0;
        margin-bottom: 0;
      }
      a {
        display: block;
        width: 240px;
        color: #555;
        text-decoration: none;
        font-size: 14px;
        padding: 2px 0 2px 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-left: 1px solid transparent;
        transition: all 0.3s ease;
        &:hover {
          color: #a166ab;
        }
      }
    }
  }

  .active {
    color: #a166ab;
    &::before {
      display: block;
      content: '';
      height: 18px;
      width: 1px;
      background-color: #a166ab;
      position: absolute;
      left: 0;
    }
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const BlogPostTemplate = ({
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
}) => {
  let ticking = false;

  let textContent = '';

  useEffect(() => {
    requestAnimationFrame(() => {
      const gitalk = new Gitalk({
        clientID: '05484176953aa83cc017',
        clientSecret: '0f9428612865ebbcc1d23d01bf581e6c002476ad',
        repo: 'gatsbyBlogComments',
        owner: 'gaoac',
        admin: ['gaoac'],
        id: String(dayjs(date).valueOf()),
        distractionFreeMode: false,
      });

      gitalk.render('comments');
    });

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { scrollTop } = document.documentElement;
          const titleDOM = document.querySelectorAll('#article a');
          const titleArray = [].slice.call(titleDOM);
          const tocTitle = document.querySelectorAll('#toc-affix li a');
          const tocTitleArray = [].slice.call(tocTitle);
          titleArray.map(item => {
            if (item.parentNode.offsetTop <= scrollTop) {
              textContent = item.parentNode.textContent;
            }
            return item;
          });

          tocTitleArray.map(item => {
            item.classList.remove('active');
            return item;
          });
          tocTitleArray.map(item => {
            if (item.textContent.toLocaleLowerCase() === textContent.toLocaleLowerCase()) {
              item.classList.add('active');
            }
            return item;
          });

          ticking = false;
        });
      }
      ticking = true;
    });
  });

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} description={description || excerpt} />
      <article>
        <SCHeader>
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
            <SCLabel>
              <IconClock size={16} />
              &nbsp;
              {dayjs(date).format('YYYY-MM-DD')}
            </SCLabel>
            &nbsp;&nbsp;
            {tags && tags.length ? (
              <SCLabel>
                <IconTag size={16} />
                &nbsp;
                {tags.map(text => (
                  <Tag>{text}</Tag>
                ))}
              </SCLabel>
            ) : null}
          </p>
        </SCHeader>
        <SCSection id="article" dangerouslySetInnerHTML={{ __html: html }} />
        <SCTocAffix id="toc-affix">
          <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
        </SCTocAffix>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
      </article>
      <div id="comments" />
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
};

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
        date
        description
        tags
      }
    }
  }
`;
