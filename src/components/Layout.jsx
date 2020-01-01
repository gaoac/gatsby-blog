import React from 'react';
import Header from './Header';
import 'prismjs/themes/prism-tomorrow.css';
import './Layout.less';

class Layout extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className="layout">
        <Header title={title} />
        <div className="content">
          <main className="main">{children}</main>
        </div>
        <footer>
          © {new Date().getFullYear()}, Built with
          <a href="https://www.gatsbyjs.org">&nbsp;Gatsby</a>
        </footer>
      </div>
    );
  }
}

export default Layout;
