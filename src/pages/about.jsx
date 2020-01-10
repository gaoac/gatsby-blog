import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Divider, Rate, Typography } from 'antd';
import { QqOutlined, GithubOutlined } from '@ant-design/icons';
import { Mail as IconMail } from 'react-feather';
import Gitalk from 'gitalk';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { rhythm } from '../utils/typography';
import theme from '../theme/default';

const { Text } = Typography;

const SCIconMail = styled(IconMail)`
  margin-right: 5px;
  transform: translateY(2px);
`;

const SCContent = styled.div`
  margin: 0;
  padding: 6px;
  border: 1px solid ${theme['@custom-article-border']};
`;

export default ({
  data: {
    site: {
      siteMetadata: { title, author },
    },
    avatar,
  },
  location,
}) => {
  useEffect(() => {
    requestAnimationFrame(() => {
      const gitalk = new Gitalk({
        clientID: '05484176953aa83cc017',
        clientSecret: '0f9428612865ebbcc1d23d01bf581e6c002476ad',
        repo: 'gatsbyBlogComments',
        owner: 'gaoac',
        admin: ['gaoac'],
        id: 'about',
        distractionFreeMode: false,
      });

      gitalk.render('comments_about');
    });
  });
  return (
    <Layout location={location} title={title}>
      <SCContent>
        <Image
          fixed={avatar.childImageSharp.fixed}
          alt={author}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 50,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <span>Do you have a dream ? 一个还没秃顶的前端开发者</span>
        <Divider orientation="left">博客简述</Divider>
        <p>
          <Text type="secondary">
            之前基于Hexo构建的静态博客（托管在 Github Pages）,响应速度不太理想，并且是基于 node EJS
            渲染，定制起来比较麻烦。正好一直在使用 React 技术栈，故采用 GatsbyJS
            从零开始构建属于自己的博客，借助于 Gatsby 强大的生态，我们可以很轻松的解析 markdown
            文件，并使用 Graphql 强大的查询功能，实现静态博客需要的大部分功能。并且使用 netlify
            来保证持续部署。
          </Text>
        </p>
        <p>
          本博客使用技术：
          <a href="https://github.com/facebook/react" rel="noopener noreferrer" target="_blank">
            React
          </a>
          <Divider type="vertical" />
          <a href="https://github.com/gatsbyjs/gatsby" rel="noopener noreferrer" target="_blank">
            Gatsby
          </a>
          <Divider type="vertical" />
          <a href="https://github.com/graphql" rel="noopener noreferrer" target="_blank">
            GraphQL
          </a>
        </p>
        <p>
          源码地址：
          <a href="https://github.com/gaoac/gatsby-blog" rel="noopener noreferrer" target="_blank">
            gatsby-blog
          </a>
        </p>
        <Divider orientation="left">关于我</Divider>
        <ul style={{ listStyleType: 'circle' }}>
          <li>姓名：高安存</li>
          <li>
            教育：河南大学
            <Divider type="vertical" />
            软件工程
            <Divider type="vertical" />
            本科
          </li>
          <li>
            联系方式：
            <QqOutlined /> 781387315
            <Divider type="vertical" />
            <SCIconMail size={14} />
            <a href="mailto:gaoac.snow@outlook.com"> gaoac.snow@outlook.com</a>
            <Divider type="vertical" />
            <GithubOutlined />{' '}
            <a
              href="https://github.com/gaoac"
              rel="noopener noreferrer"
              target="_blank"
              title="Github"
            >
              Github
            </a>
          </li>
          <li>坐标：深圳市</li>
          <li>
            其他相关博客：
            <a
              href="https://gaoac.github.io/blog/"
              rel="noopener noreferrer"
              target="_blank"
              title="Hexo博客"
            >
              Hexo博客
            </a>
            <Divider type="vertical" />
            <a
              href="https://www.jianshu.com/u/55d01f741641"
              rel="noopener noreferrer"
              target="_blank"
              title="简书"
            >
              简书
            </a>
          </li>
          <li>
            技能
            <ul>
              <li>
                HTML、CSS、JavaScript：能熟练开发符合 W3C 标准的页面{' '}
                <Rate allowHalf disabled defaultValue={3} />
              </li>
              <li>
                React 技术栈
                <ul>
                  <li>
                    React 、Redux、Router <Rate allowHalf disabled defaultValue={3} />
                  </li>
                  <li>
                    Ant Design 、UmiJS、DvaJS <Rate allowHalf disabled defaultValue={3} />
                  </li>
                  <li>
                    CSS in JS：styled-components <Rate allowHalf disabled defaultValue={3} />
                  </li>
                </ul>
              </li>
              <li>
                ECMAScript 6：日常开发必备 <Rate allowHalf disabled defaultValue={3} />
              </li>
              <li>
                WebPack：可以对脚手架进行针对性的配置 <Rate allowHalf disabled defaultValue={2} />
              </li>
              <li>
                Linux：系统、常见软件服务安装与配置 <Rate allowHalf disabled defaultValue={2} />{' '}
                <a
                  href="https://gaoac.netlify.com/%E5%8F%AF%E8%83%BD%E6%98%AF%E7%9B%AE%E5%89%8D%E6%9C%80%E8%AF%A6%E7%BB%86%E7%AE%80%E6%98%8E%E7%9A%84CentOS7%E5%AE%89%E8%A3%85%E4%B8%8E%E7%AE%A1%E7%90%86%E6%95%99%E7%A8%8B/"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="可能是目前最详细简明的CentOS7安装与管理教程
              "
                >
                  《可能是目前最详细简明的CentOS7安装与管理教程》
                </a>
              </li>
            </ul>
          </li>
          <li>
            其他
            <ul>
              <li>常用开发工具：VSCode 、WebStorm、Git</li>
              <li>
                良好的代码编程习惯：注重代码规范、遵循良好的开发流程、工具控
                <a
                  href="https://github.com/gaoac/dev-docs"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="一个持续进化的程序员开发文档"
                >
                  《一个持续进化的程序员开发文档》
                </a>
              </li>
            </ul>
          </li>
          <li>
            爱好
            <ul>
              <li>偶尔玩玩游戏、看看动漫</li>
              <li>关注前沿技术动态</li>
              <li>汉服、配饰（女朋友拉坑）</li>
            </ul>
          </li>
        </ul>
      </SCContent>
      <div id="comments_about" />
    </Layout>
  );
};
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
