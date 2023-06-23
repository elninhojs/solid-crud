import { Show } from 'solid-js'
import styles from './Button.module.css'
import Icon, { IconContent } from '../icon/Icon'

interface ButtonProps {
    height?: string,
    width?: string,
    colorContext?: "primary" | "secondary" | "error" | "success" | "warn" | "disabled", 
    ariaLabel?: string,
    disabled?: boolean,
    type?: "button" | "submit" | "reset",
    label?: string,
    icon?: IconContent,
    onClick?:(e: any)=> any
}

export default function Button({disabled, icon, label, colorContext="primary", ariaLabel, onClick, type="button", height = "auto", width = "auto"}: ButtonProps){
    return (<button class={styles.button} disabled={disabled} aria-label={ariaLabel} type={type} onClick={onClick}
        style={`height: ${height}; width: ${width}; --bg: var(--color-${colorContext}); --fg: var(--color-${colorContext}-fg); --hover: var(--color-${colorContext}-light); --focus: var(--color-${colorContext}-dark)`}>
        <Show when={icon}>
            <span class="icon"><Icon name={icon}></Icon></span>
        </Show>
        <Show when={label}>
            <span>{label}</span>
        </Show>
    </button>)
}

/*<script>
    import { createEventDispatcher } from "svelte";
    import Icon from "../icon/Icon.svelte";
    export let automation;
    export let label;
    export let icon;
    export let height = "auto";
    export let width = "auto";
    export let disabled = false;
    export let colorContext = "primary";
    export let id;
    export let type = "button";
    let dispatch = createEventDispatcher();
    const onClick = (e) => dispatch("click", e);
</script>

<button
    {disabled}
    {id} 
    {automation}
    style={`height: ${height}; width: ${width}; --bg: var(--color-${colorContext}); --fg: var(--color-${colorContext}-fg); --hover: var(--color-${colorContext}-light)`}
    {type}
    on:click={(e) => {
        onClick(e);
    }}
>
    {#if icon}
        <span class="icon"><Icon name={icon} /></span>
    {/if}
    <span>{label}</span>
</button>

<style>
    button {
        border: none;
        margin: 0;
        border-radius: 0;
        text-align: left;
        display: inline-flex;
        align-items: center;
        background: var(--bg);
        color: var(--fg);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
        vertical-align: middle;
    }

    button .icon {
        display: inline-flex;
        margin-right: .5rem;
    }

    button:disabled {
        cursor: not-allowed;
        background: var(--color-disabled);
        color: var(--color-disabled-fg);
    }

    button:not(:disabled):hover {
        cursor: pointer;
        background: var(--hover);
    }

    button:focus {
        outline: 2px solid var(--s-white-pink);
    }
</style>*/