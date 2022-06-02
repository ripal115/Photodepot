/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";
// import { getUserInfo } from "../../../../../utils/user.util";
export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  // let userInfo = getUserInfo();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${
          !hasSubmenu && "menu-item-active"
        } menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <img alt="" src="media/allIconsForTable/dashboard.svg" />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/photographer", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/photographer">
            <span className="svg-icon menu-icon">
              <img alt="" src="media/allIconsForTable/feedback.svg" />
            </span>
            <span className="menu-text">Photographer</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/photoeditor", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/photoeditor">
            <span className="svg-icon menu-icon">
              <img alt="" src="media/allIconsForTable/feedback.svg" />
            </span>
            <span className="menu-text">Photo Editor</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive(
            "/propertybuilder",
            false
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/propertybuilder">
            <span className="svg-icon menu-icon">
              <img alt="" src="media/allIconsForTable/feedback.svg" />
            </span>
            <span className="menu-text">Realestate Agent</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/otherusers", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/otherusers">
            <span className="svg-icon menu-icon">
              <img alt="" src="media/allIconsForTable/feedback.svg" />
            </span>
            <span className="menu-text">Miscellaneous Affiliates</span>
          </NavLink>
        </li>
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/hire",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/hire">
            <span className="svg-icon menu-icon">
              <i
                className="fa-solid fa-comment"
                style={{ fontSize: "13px", color: "#383839" }}
              ></i>
            </span>
            <span className="menu-text">Hire</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/hiredphotographer",
                  false
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link" to="/hiredphotographer">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Photographer</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <div className="menu-submenu ">
          <i className="menu-arrow" />
          <ul className="menu-subnav">
            {/* <li
        <
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/hire",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/hire">
            <span className="svg-icon menu-icon">
              <i
                className="fa-solid fa-comment"
                style={{ fontSize: "13px", color: "#383839" }}
              ></i>
            </span>
            <span className="menu-text">Hire</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              {/* Invoice */}
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/hiredphotographer",
                false
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink className="menu-link" to="/hiredphotographer">
                <i className="menu-bullet menu-bullet-dot">
                  <span />
                </i>
                <span className="menu-text">Photographer</span>
              </NavLink>
            </li>
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/hiredphotoeditor",
                false
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink className="menu-link" to="/hiredphotoeditor">
                <i className="menu-bullet menu-bullet-dot">
                  <span />
                </i>
                <span className="menu-text">Photoeditor</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <li
          className={`menu-item ${getMenuItemActive("/reportabuse", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/reportabuse">
            <span className="svg-icon menu-icon">
              {/* <img alt="" src="media/allIconsForTable/feedback.svg" /> */}
              <i class="fa-solid fa-comments"></i>
            </span>
            <span className="menu-text">Report Abuse</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/adminreview", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/adminreview">
            <span className="svg-icon menu-icon">
              {/* <img alt="" src="media/allIconsForTable/feedback.svg" /> */}
              <i class="fa-solid fa-comments"></i>
            </span>
            <span className="menu-text">Review</span>
          </NavLink>
        </li>

        {/* <li
            className={`menu-item ${getMenuItemActive("/adminData", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/adminData">
              <span className="svg-icon menu-icon">
                <img alt="" src="media/allIconsForTable/feedback.svg" />
              </span>
              <span className="menu-text">Admin Data</span>
            </NavLink>
          </li> */}
      </ul>
    </>
  );
}
