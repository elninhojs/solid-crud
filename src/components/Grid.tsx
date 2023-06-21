import { css } from "solid-styled-components";
import {JSX} from 'solid-js';

interface GridProps {
    children: JSX.Element,
    ariaLabel?: string,
    cols: string,
    colsTiny?: string,
    colsSmall?: string,
    colsBig?: string,
    colsMedium?: string 
  } 
  


const Grid = ({children, ariaLabel, cols, colsBig, colsMedium, colsSmall, colsTiny}: GridProps) => (
  <div
    class={css`
    display: grid;
    gap: 5px;
    padding: 5px 0;
    grid-template-columns: var(--cols);
    box-sizing: border-box;



@media only screen and (max-width: 600px) {
    .brt-grid {
        grid-template-columns: var(--cols-tiny);
    }
}

@media only screen and (min-width: 600px) {
    .brt-grid {
        grid-template-columns: var(--cols-tiny);
    }
}

@media only screen and (min-width: 768px) {
    .brt-grid {
        grid-template-columns: var(--cols-small);
    }
}

@media only screen and (min-width: 992px) {
    .brt-grid {
        grid-template-columns: var(--cols-medium);
    }
}

@media only screen and (min-width: 1200px) {
    .brt-grid {
        grid-template-columns: var(--cols-big);
    }
}
    `}
  >
    click
  </div>
);

/*<script>
    export let cols = "repeat(3, 1fr)";
    export let id;
    export let automation;
    export let colsBig = "";
    export let colsMedium = "";
    export let colsSmall = "";
    export let colsTiny = "";

    let clazz = ""
    export { clazz as class }

    const VARS = `--cols: ${cols};` +
                 `--cols-big: ${colsBig || cols};` +
                 `--cols-medium: ${colsMedium || colsBig || cols};` +
                 `--cols-small: ${colsSmall || colsMedium || colsBig || cols};` +
                 `--cols-tiny: ${colsTiny || colsSmall || colsMedium || colsBig || cols}`;

</script>

<div {id} class:brt={true} class:brt-grid={true} class={clazz} {automation} style={VARS}>
    <slot></slot>
</div>

<style>
    .brt-grid {
        display: grid;
        gap: 5px;
        padding: 5px 0;
        grid-template-columns: var(--cols);
        box-sizing: border-box;
    }


    @media only screen and (max-width: 600px) {
        .brt-grid {
            grid-template-columns: var(--cols-tiny);
        }
    }

    @media only screen and (min-width: 600px) {
        .brt-grid {
            grid-template-columns: var(--cols-tiny);
        }
    }

    @media only screen and (min-width: 768px) {
        .brt-grid {
            grid-template-columns: var(--cols-small);
        }
    }

    @media only screen and (min-width: 992px) {
        .brt-grid {
            grid-template-columns: var(--cols-medium);
        }
    }

    @media only screen and (min-width: 1200px) {
        .brt-grid {
            grid-template-columns: var(--cols-big);
        }
    }
</style>*/