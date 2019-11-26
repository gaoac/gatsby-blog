import React from 'react';
import Header from './Header';
import { rhythm } from '../utils/typography';

import 'prismjs/themes/prism-tomorrow.css';
import './Layout.less';

class Layout extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className="layout">
        <Header title={title} />
        <div
          style={{
            // marginLeft: `auto`,
            // marginRight: `auto`,
            width: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
          className="content"
        >
          <main className="main">{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    );
  }
}

export default Layout;
