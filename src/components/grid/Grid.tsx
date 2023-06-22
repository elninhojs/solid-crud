import styles from './Grid.module.css'
import {JSX} from 'solid-js';

interface GridProps {
    children?: JSX.Element,
    ariaLabel?: string,
    cols: string,
    colsTiny?: string,
    colsSmall?: string,
    colsBig?: string,
    colsMedium?: string
  } 

export const Grid = ({children, ariaLabel, cols, colsBig, colsMedium, colsSmall, colsTiny}: GridProps) => (
  <div area-aria-label={ariaLabel} style={`
  --cols: ${cols}; --cols-big: ${colsBig || cols};
  --cols-medium: ${colsMedium || colsBig || cols};
  --cols-small: ${colsSmall || colsMedium || colsBig || cols};
  --cols-tiny: ${colsTiny || colsSmall || colsMedium || colsBig || cols}
  `} class={styles.grid}>
    {children}
  </div>
);