import { createSignal } from "solid-js";

interface Props {
  onAddTask: (inputValue: string) => Promise<void>
}
const InputBar = ({onAddTask}: Props) => {
  const [inputValue, setInputValue] = createSignal("")
  return (
    <form class="mb-5 row row-cols-2 justify-content-center" onSubmit={(e)=>{e.preventDefault(); onAddTask(inputValue()); setInputValue("")}}>
      <input aria-label="task input text" type="text" class="input-group-text p-1 w-25" placeholder="Add task here..." oninput={(e)=>setInputValue(e.target.value)} value={inputValue()}/>
      <button aria-label="button to add task" class="btn btn-primary ms-3 w-auto primary" type="submit">
        Add task
      </button>
  </form>
  );
};

export default InputBar;
