import React, { createRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo.svg";

let ps;

const Sidebar = (props) => {
  const sidebar = createRef();
  const { user } = useSelector((state) => state.Authenticate);

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    // Desmontar o componet
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  }, [sidebar]);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.children.props.location.pathname.indexOf(routeName) > -1
      ? "active"
      : "";
  };

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <div className="sidebar-logo">
          <Link to="/admin/dashboard">
            <img src={logo} alt="react-logo" />
          </Link>
        </div>
        <div className="user">
          <h6>{user.name}</h6>
          <span>{user.email}</span>
        </div>
      </div>

      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((route, key) => {
            return (
              <li className={activeRoute(route.path)} key={key}>
                <NavLink
                  to={route.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={route.icon} />
                  <p>{route.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
