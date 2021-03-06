import React from 'react';
import styled from 'styled-components';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import Header from './Header';
import theme from '../theme/default';

const SCLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const SCContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  @media screen and (max-width: 500px) {
    display: block;
  }
`;
const SCMain = styled.main`
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 60vw;
  padding: 2rem 2rem;
  background: ${theme['@body-background']};

  @media screen and (max-width: 500px) {
    width: 100vw;
  }
`;
const SCFooter = styled.footer`
  display: flex;
  justify-content: center;
`;

const Layout = ({ location, title, children }) => {
  return (
    <SCLayout>
      <Header location={location} title={title} />
      <SCContent>
        <SCMain>{children}</SCMain>
      </SCContent>
      <SCFooter>
        © 2019 - {new Date().getFullYear()}, Built with
        <a href="https://www.gatsbyjs.org">&nbsp;Gatsby</a>
      </SCFooter>
    </SCLayout>
  );
};

export default Layout;
