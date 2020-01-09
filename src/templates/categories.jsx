import React from 'react';
import { Link, graphql } from 'gatsby';
import { Timeline } from 'antd';
import dayjs from 'dayjs';
import { ClockCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { groupBy } from '../utils/utils';
import { rhythm } from '../utils/typography';
import theme from '../theme/default';

const SCLink = styled(Link)`
  text-decoration: none !important;
  &.hvr-underline-from-center {
    &::before {
      height: 2px;
      background: ${theme['@primary-color']};
    }
  }
`;
const SCTagHeader = styled.h3`
  margin-bottom: ${rhythm(1)};
  span {
    font-size: 14px;
  }
`;

const SCYear = styled.div`
  font-size: 22px;
  font-weight: 600;
  position: relative;
  top: -4px;
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
  const { nodes, totalCount } = allMarkdownRemark;
  const list = groupBy(nodes, item => dayjs(item.frontmatter.date).format('YYYY'));
  return (
    <Layout title={siteTitle}>
      <SCTagHeader>
        {categorie} <span>分类</span>
      </SCTagHeader>
      <Timeline>
        {list &&
          list.map((element, i) => (
            <>
              {i === 0 && (
                <Timeline.Item>
                  <span>
                    嗯..! 目前共计 {totalCount} 篇日志关于{categorie}。 继续努力。
                  </span>
                  <br />
                  <br />
                </Timeline.Item>
              )}
              <Timeline.Item
                dot={<ClockCircleOutlined type="clock-circle-o" style={{ fontSize: '16px' }} />}
                color="red"
              >
                <SCYear>
                  {dayjs(element[0].frontmatter.date).format('YYYY')}
                  ...
                </SCYear>
                <br />
              </Timeline.Item>
              {element.map((item, index) =>
                index !== element.length - 1 ? (
                  <Timeline.Item key={item.frontmatter.date}>
                    <span>{dayjs(item.frontmatter.date).format('MM-DD')}</span>&nbsp;&nbsp;
                    <span>
                      <SCLink to={item.fields.slug} className="hvr-underline-from-center">
                        {item.frontmatter.title}
                      </SCLink>
                    </span>
                  </Timeline.Item>
                ) : (
                  <>
                    <Timeline.Item key={item.frontmatter.date}>
                      <span>{dayjs(item.frontmatter.date).format('MM-DD')}</span>&nbsp;&nbsp;
                      <span>
                        <SCLink to={item.fields.slug} className="hvr-underline-from-center">
                          {item.frontmatter.title}
                        </SCLink>
                      </span>
                      <br />
                      <br />
                    </Timeline.Item>
                  </>
                ),
              )}
            </>
          ))}
      </Timeline>
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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$categorie] } } }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          date
          title
        }
      }
    }
  }
`;
