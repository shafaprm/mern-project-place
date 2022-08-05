import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../context/auth-context.js";
import styles from "./NavLinks.module.css";

const NavLinks = (props) => {
  const authContext = useContext(AuthContext);

  return (
    <ul className={styles["nav-links"]}>
      <li>
        <NavLink to="/">users</NavLink>
      </li>
      {authContext.token && (
        <React.Fragment>
          <li>
            <NavLink to={`/places/user/${authContext.userId}`}>my place</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">new place</NavLink>
          </li>
          <li>
            <button onClick = {authContext.logoutHandler}>logout</button>
          </li>
        </React.Fragment>
      )}
      {!authContext.token && (
        <li>
          <NavLink to="/auth">login</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
