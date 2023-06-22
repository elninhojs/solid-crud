import type { Component } from 'solid-js';
import styles from "./TopBar.module.css"
import logo from '../../logo.svg';
import Icon, { Icons } from '../icon/Icon';
import { useGlobalContext } from '../../context/store';
const TopBar: Component = () => {
  const {todoTasks, doneTasks} = useGlobalContext();
  return (
      <div class={styles.topbar}>
        <img src={logo} class={styles.logo} alt="logo" />
        <span>Solid app demo</span>
        <span>
          <Icon name={Icons.faSolidListCheck}></Icon>
          {todoTasks()}
        </span>
        <span>
          <Icon name={Icons.bsCheck}></Icon>
          {doneTasks()}
        </span>
      </div>
    
  );
};

export default TopBar;
