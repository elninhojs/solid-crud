import type { Component } from 'solid-js';
import styles from "./TopBar.module.css"
import logo from '../../logo.svg';
const TopBar: Component = () => {
  return (
      <div class={styles.topbar}>
        <img src={logo} class={styles.logo} alt="logo" />
        <span>Solid app demo</span>
      </div>
    
  );
};

export default TopBar;
