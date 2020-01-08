import React from 'react';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

// Utilities
// eslint-disable-next-line import/no-extraneous-dependencies

// Components
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { groupBy } from '../utils/utils';
import Layout from '../components/Layout';
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

const SCYear = styled.div`
  font-size: 22px;
  font-weight: 600;
  position: relative;
  top: -4px;
`;

const ArchivesPage = ({
  data: {
    allMarkdownRemark: { nodes, totalCount },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  const list = groupBy(nodes, item => dayjs(item.frontmatter.date).format('YYYY'));
  return (
    <Layout title={title}>
      <Helmet title={title} />
      <div>
        <h1>归档</h1>
        <Timeline>
          {list &&
            list.map((element, i) => (
              <>
                {i === 0 && (
                  <Timeline.Item>
                    <span className="desc">嗯..! 目前共计 {totalCount} 篇日志。 继续努力。</span>
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
      </div>
    </Layout>
  );
};

export default ArchivesPage;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000, sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date
          title
        }
      }
      totalCount
    }
  }
`;
