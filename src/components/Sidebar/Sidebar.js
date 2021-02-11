import React, { createRef, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Nav, CustomInput } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo.svg";
import { statusOpenClose } from "../../store/Actions";
let ps;

const Sidebar = (props) => {
  const [openClose, setOpenClose] = useState(false);
  const sidebar = createRef();
  const dispatch = useDispatch();
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
  // Alterar status do estabelecimento
  const handleOpenClose = () => {
    // setOpenClose(!openClose);
    dispatch(statusOpenClose());
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

        <div className="openClose">
          <h6>{openClose ? "Aberto" : "Fechado"}</h6>
          <CustomInput
            type="switch"
            defaultChecked={openClose}
            id="open_close"
            valid={openClose}
            name="open_close"
            onClick={handleOpenClose}
          />
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
