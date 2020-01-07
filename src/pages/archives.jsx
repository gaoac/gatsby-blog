import React from 'react';
import { Timeline } from 'antd';
import dayjs from 'dayjs';

// Utilities
// eslint-disable-next-line import/no-extraneous-dependencies

// Components
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';

const SCLink = styled(Link)`
  text-decoration: none !important;
  &.hvr-underline-from-center {
    &::before {
      height: 2px;
    }
  }
`;

const ArchivesPage = ({
  data: {
    allMarkdownRemark: { nodes },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout title={title}>
    <Helmet title={title} />
    <div>
      <h1>归档</h1>
      <Timeline>
        {nodes.map(item => (
          <Timeline.Item key={item.frontmatter.date}>
            <span>{dayjs(item.frontmatter.date).format('YYYY-MM-DD')}</span>&nbsp;&nbsp;
            <span>
              <SCLink to={item.fields.slug} className="hvr-underline-from-center">
                {item.frontmatter.title}
              </SCLink>
            </span>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  </Layout>
);

export default ArchivesPage;

export const pageQuery = graphql`
  query {
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
    }
  }
`;
