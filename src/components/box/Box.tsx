import {JSX} from 'solid-js';
import styles from "./Box.module.css"

interface BoxProps {
  children: JSX.Element,
  title: string
}

const Box = ({children, title}: BoxProps) => {
  return (
      <div class={styles.container}>
        <strong>{title}</strong>
        <div>
          {children}
        </div>
      </div>
  );
};

export default Box;
