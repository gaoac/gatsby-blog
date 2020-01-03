import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import {
  Menu as IconMenu,
  Home as IconHome,
  Tag as IconTag,
  User as IconUser,
} from 'react-feather';
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

const SCMobileMenu = styled.div`
  display: none;
  @media screen and (max-width: 500px) {
    display: block;
  }
`;
const SCMenuUl = styled.ul`
  display: flex;
  margin: 0;
  @media screen and (max-width: 500px) {
    display: ${props => (props.show ? 'block' : 'none')};
    margin: 0;
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
  }
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
  @media screen and (max-width: 500px) {
    list-style: none;
    margin: 0;
    padding: 0 20px;
    height: 30px;
    line-height: 30px;
    min-width: 72px;
    border: 0;
    &:hover {
      border: 0;
    }
  }
`;

const SCLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #555;
  text-decoration: none;
  &:hover {
    color: #1890ff;
    text-decoration: none;
  }
  span {
    padding: 0 6px;
  }
`;

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const handleChangeMenuVisible = () => {
    setMenuVisible(!menuVisible);
  };
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
      <SCMobileMenu onClick={handleChangeMenuVisible}>
        <IconMenu />
      </SCMobileMenu>

      <SCMenuUl show={menuVisible}>
        <SCMenuLi>
          <SCLink to="/">
            <IconHome size={16} />
            <span>首页</span>
          </SCLink>
        </SCMenuLi>
        <SCMenuLi>
          <SCLink to="/tags">
            <IconTag size={16} />
            <span>标签</span>
          </SCLink>
        </SCMenuLi>
        <SCMenuLi>
          <SCLink to="/about">
            <IconUser size={16} />
            <span>关于</span>
          </SCLink>
        </SCMenuLi>
      </SCMenuUl>
    </SCHeader>
  );
};

export default Header;
