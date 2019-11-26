import React from 'react';
import { Link } from 'gatsby';
import './Header.less';

class Header extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <header className="header">
        <div className="header-inner">
          <div className="site-brand-wrapper">
            <div className="site-meta">
              <div className="site-title">{title}</div>
            </div>
          </div>
        </div>
        <nav className="site-nav">
          <ul className="menu">
            <li className="menu-item">
              <Link className="navbar-item" to="/">
                首页
              </Link>
            </li>
            <li className="menu-item">
              <Link className="navbar-item is-hidden-m" to="/tags">
                标签
              </Link>
            </li>
            <li className="menu-item">
              <Link className="navbar-item is-hidden-m" to="/about">
                关于
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
