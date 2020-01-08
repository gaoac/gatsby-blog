/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import { Tag, Divider } from 'antd';
import dayjs from 'dayjs';
import Gitalk from 'gitalk';
import { Clock as IconClock, Tag as IconTag, Folder as IconFolder } from 'react-feather';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { rhythm, scale } from '../utils/typography';
import { getTagColor } from '../utils/utils';

import 'gitalk/dist/gitalk.css';
import theme from '../theme/default';

const SCHeader = styled.header`
  h3 {
    text-align: center;
    border-bottom: 0;
  }
`;

const SCLabel = styled.span`
  svg {
    margin-right: 8px;
    vertical-align: -0.25em;
  }
`;

const SCSection = styled.section`
  text-align: justify;
  td,
  th {
    padding: 8px;
  }
  .line-numbers .line-numbers-rows {
    top: 1rem;
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
      border-left: 1px solid ${theme['@custom-article-border']};
    }
  }
  ul {
    color: ${theme['@text-color']};
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
        color: ${theme['@text-color']};
        text-decoration: none;
        font-size: 14px;
        padding: 2px 0 2px 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-left: 1px solid transparent;
        transition: all 0.3s ease;
        &:hover {
          color: ${theme['@primary-color']};
        }
      }
    }
  }

  .active {
    color: ${theme['@primary-color']};
    &::before {
      display: block;
      content: '';
      height: 18px;
      width: 1px;
      background-color: ${theme['@primary-color']};
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
      frontmatter: { date, tags, title, description, categories },
      excerpt,
      html,
      tableOfContents,
    },
    site: {
      siteMetadata: { title: siteTitle },
    },
    tagsGroup,
    categoriesGroup,
  },
  pageContext: { previous, next },
  location,
}) => {
  let ticking = false;

  let textContent = '';

  const tagsArray = tagsGroup.group;
  const categoriesArray = categoriesGroup.group;
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
          <h3
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {title}
          </h3>
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
              {dayjs(date).format('YYYY-MM-DD')}
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
        categories
      }
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
