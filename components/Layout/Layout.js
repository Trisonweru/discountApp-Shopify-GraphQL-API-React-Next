import React from "react";
import Navigation from "../Navigation/Navigation";
import styles from "./Layout.module.css";
function Layout() {
  return (
    <div className={styles.AppContainer}>
      <Navigation />
    </div>
  );
}

export default Layout;
