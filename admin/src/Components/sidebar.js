import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="https://raw.githubusercontent.com/nguyendinhtu2002/adm/e6984272c00c7b96d21df94d647e766ca9c70849/public/images/logo.svg"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Thống kê</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Users</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link "
                to="/category"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Category</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                  activeClassName="active"
                  className="menu-link "
                  to="/professional"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Professional</span>
              </NavLink>
            </li>


            {/*<li className="menu-item">*/}
            {/*  <NavLink*/}
            {/*      activeClassName="active"*/}
            {/*      className="menu-link "*/}
            {/*      to="/message"*/}
            {/*  >*/}
            {/*    <i className="icon fas fa-phone"></i>*/}
            {/*    <span className="text">Message</span>*/}
            {/*  </NavLink>*/}
            {/*</li>*/}

            {/* <li className="menu-item ">
              <NavLink
                activeClassName="active"
                className="menu-link  "
                to="/updates"
              >
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">Money</span>
              </NavLink>
            </li>
            <li className="menu-item ">
              <NavLink
                activeClassName="active"
                className="menu-link "
                to="/history"
              >
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">History</span>
              </NavLink>
            </li> */}
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
