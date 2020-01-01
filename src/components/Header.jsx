import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';
import Icon from './Icon';
import './Header.less';

const Header = () => {
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
  const { clientWidth } = document.body;
  const isMobile = clientWidth <= 500;

  return (
    <header className="header">
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
            <Icon type="icon-menu" className="mobile-menu-icon" />
            {menuVisible ? (
              <li className="mobile-menu-li">
                <li className="menu-item">
                  <Link to="/">首页</Link>
                </li>
                <li className="menu-item">
                  <Link to="/tags">标签</Link>
                </li>
                <li className="menu-item">
                  <Link to="/about">关于</Link>
                </li>
              </li>
            ) : null}
          </div>
        </>
      ) : (
        <li className="menu">
          <li className="menu-item">
            <Link to="/">首页</Link>
          </li>
          <li className="menu-item">
            <Link to="/tags">标签</Link>
          </li>
          <li className="menu-item">
            <Link to="/about">关于</Link>
          </li>
        </li>
      )}
    </header>
  );
};

export default Header;
