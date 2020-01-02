import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Menu } from 'react-feather';
import styled from 'styled-components';

import { rhythm } from '../utils/typography';

const SCHeader = styled.header`
  height: 60px;
  width: 100vw;
  display: flex;
  position: fixed;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  z-index: 1;
  .site-meta {
    display: flex;
    align-items: center;
  }
`;

const SCMenuUl = styled.ul`
  display: flex;
  margin: 0;
`;

const SCMenuLi = styled.li`
  list-style: none;
  margin: 0;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  min-width: 72px;
  border-top: 2px solid transparent;
  &:hover {
    border-top: 2px solid #1890ff;
    border-bottom: 2px solid transparent;
  }
`;

const SCLink = styled(Link)`
  display: block;
  color: #555;
  text-decoration: none;
  &:hover {
    color: #1890ff;
    text-decoration: none;
  }
`;

const SCMobileMenuUl = styled.ul`
  top: 60px;
  position: absolute;
  right: 0vw;
  width: 100vw;
  list-style: none;
  margin: 0;
  padding: 4px 10px;
  text-align: left;
  list-style-type: none;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;
const SCMobileMenuLi = styled.li`
  a {
    display: block;
    color: #555;
    text-decoration: none;
    &:hover {
      color: #1890ff;
    }
  }
`;

const Header = () => {
  let isMobile = false;
  const [menuVisible, setMenuVisible] = useState(false);
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `);
  const { title, author } = data.site.siteMetadata;
  const inBrowser = typeof window !== 'undefined';

  // eslint-disable-next-line no-undef
  const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
  // eslint-disable-next-line no-undef
  const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();

  const UA = inBrowser && window.navigator.userAgent.toLowerCase();

  const isAndroid = (UA && UA.indexOf('android') > 0) || weexPlatform === 'android';
  const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios';

  if (isAndroid || isIOS) {
    const { clientWidth } = document.body;
    isMobile = clientWidth <= 500;
  }

  return (
    <SCHeader>
      <div className="site-meta">
        <Link to="/">
          <Image
            fixed={data.avatar.childImageSharp.fixed}
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
        </Link>
        <span>{title}</span>
      </div>

      {isMobile ? (
        <>
          <div onClick={() => setMenuVisible(!menuVisible)}>
            <Menu />
          </div>
          {menuVisible ? (
            <SCMobileMenuUl>
              <SCMobileMenuLi>
                <SCLink to="/">首页</SCLink>
              </SCMobileMenuLi>
              <SCMobileMenuLi>
                <SCLink to="/tags">标签</SCLink>
              </SCMobileMenuLi>
              <SCMobileMenuLi>
                <SCLink to="/about">关于</SCLink>
              </SCMobileMenuLi>
            </SCMobileMenuUl>
          ) : null}
        </>
      ) : (
        <SCMenuUl>
          <SCMenuLi className="menu-item">
            <SCLink to="/">首页</SCLink>
          </SCMenuLi>
          <SCMenuLi className="menu-item">
            <SCLink to="/tags">标签</SCLink>
          </SCMenuLi>
          <SCMenuLi className="menu-item">
            <SCLink to="/about">关于</SCLink>
          </SCMenuLi>
        </SCMenuUl>
      )}
    </SCHeader>
  );
};

export default Header;
