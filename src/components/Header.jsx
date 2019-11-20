import React from 'react';
import { Link } from 'gatsby';

class Header extends React.Component {
  componentDidMount() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0,
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const { target } = el.dataset;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  }

  render() {
    const { title } = this.props;
    return (
      <header>
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                {title}
              </a>

              <a
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="nav-menu"
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>

            <div id="nav-menu" className="navbar-menu">
              <div className="navbar-start" />

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <Link className="navbar-item" to="/">
                      首页
                    </Link>
                    <Link className="navbar-item is-hidden-m" to="/tags">
                      标签
                    </Link>
                    <Link className="navbar-item is-hidden-m" to="/about">
                      关于
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
