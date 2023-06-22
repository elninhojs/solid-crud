import { createSignal } from "solid-js";
import { Button, Grid, Icons } from "../../components";

interface Props {
  onAddTask: (inputValue: string) => Promise<void>
}
const InputBar = ({onAddTask}: Props) => {
  const [inputValue, setInputValue] = createSignal("")
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onAddTask(inputValue()); setInputValue("")}}>
      <Grid cols="6fr 2fr">
        <input aria-label="task input text" type="text" placeholder="Add task here..." oninput={(e)=>setInputValue(e.target.value)} value={inputValue()}/>
        <Button ariaLabel="button to add task" icon={Icons.aiPlus} label="Add task" colorContext="primary" type="submit"></Button>
      </Grid>
  </form>
  );
};

export default InputBar;
