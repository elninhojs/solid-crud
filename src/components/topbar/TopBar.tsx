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
        <span aria-label="todo tasks total">
          <Icon name={Icons.faSolidListCheck}></Icon>
          {todoTasks()}
        </span>
        <span aria-label="done tasks total">
          <Icon name={Icons.bsCheck}></Icon>
          {doneTasks()}
        </span>
      </div>
    
  );
};

export default TopBar;
