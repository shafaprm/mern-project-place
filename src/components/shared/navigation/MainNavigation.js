import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader.js";
import styles from "./MainNavigation.module.css";
import NavLinks from "./NavLinks.js";
import SideDrawer from "./SideDrawer.js";
import Backdrop from "../UI/Backdrop.js";

const MainNavigation = (props) => {
  const [drawerFlag, setDrawerFlag] = useState(false);

  const drawerHandler = () => {
    setDrawerFlag((prevDrawerFlag) => {
      return !prevDrawerFlag;
    });
  };

  return (
    <React.Fragment>
      {drawerFlag && <Backdrop onClick = {drawerHandler} />}
      <SideDrawer show = {drawerFlag} onClick = {drawerHandler}>
        <nav className={styles["main-navigation__drawer-nav"]}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className={styles["main-navigation__menu-btn"]}
          onClick={drawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className={styles["main-navigation__title"]}>
          <Link to="/">Comfy Place</Link>
        </h1>
        <nav className={styles["main-navigation__header-nav"]}>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
