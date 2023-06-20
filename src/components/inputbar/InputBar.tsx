import { createSignal } from "solid-js";
import { TextField, Button } from "@suid/material"
import AddIcon from "@suid/icons-material/Add";

interface Props {
  onAddTask: (inputValue: string) => Promise<void>
}
const InputBar = ({ onAddTask }: Props) => {
  const [inputValue, setInputValue] = createSignal("")
  return (
    <form class="task-form" onSubmit={(e) => { e.preventDefault(); onAddTask(inputValue()); setInputValue("") }}>
      <TextField autoFocus autoComplete="off" variant="standard" inputProps={{ "aria-label": "task input text" }} label="Add task here..." onChange={(e) => setInputValue(e.target.value)} value={inputValue()} />
      <Button aria-label="button to add task" variant="contained" type="submit" color="secondary" startIcon={<AddIcon />}>Add</Button>
    </form>
  );
};

export default InputBar;
