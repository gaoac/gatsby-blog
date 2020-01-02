/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import dayjs from 'dayjs';
import Gitalk from 'gitalk';
import { Clock, Tag } from 'react-feather';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { rhythm, scale } from '../utils/typography';

import 'gitalk/dist/gitalk.css';

const SCHeader = styled.header`
  color: green;
`;

const SCSection = styled.section`
  td,
  th {
    padding: 8px;
  }
`;

const SCTocAffix = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  width: 240px;
  overflow: auto;
  border-left: 1px solid #000;
  li {
    list-style: none;
    a {
      color: #555;
      text-decoration: none;
    }
  }
  .active {
    color: red;
    padding-left: 16px;
    border-left: 4px solid rgb(97, 218, 251);
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

  const theTags = tags || [];

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
            <Clock size={16} style={{ verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'sub' }}>{dayjs(date).format('YYYY-MM-DD')}</span>
            &nbsp;
            <Tag size={16} style={{ verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'sub' }}>{theTags.join(' ')}</span>
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
