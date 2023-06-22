import { For, Resource, Show } from "solid-js";
import { Task } from "../../api/types";
import { Button, Grid, Icons } from "../../components";
import styles from "./TaskList.module.css"

interface Props {
    onRemove: (task: Task) => Promise<void>
    onToggleTaskStatus: (task: Task, status: boolean) => Promise<void>
    data: Resource<Task[]>
}
const TaskList = ({ onRemove, onToggleTaskStatus, data }: Props) => {
    return (
        <div class={(data.loading && "loading") || ""}>
                <div class={styles.stats}>Showing {(data() as Task[]) && (data() as Task[]).length || 0 } task{(data() as Task[]) && (data() as Task[]).length > 1 && "s" || ""}</div>
                    <For each={data()}>
                        {(task: Task) => (
                            <div class={styles.item}>
                                <Grid cols="8fr 3fr 3fr" ariaLabel="task record row">
                                        <div aria-label="task text" class={`text ${task.completed && 'text-decoration-line-through'}`}>
                                            {task.text}
                                        </div>
                                        
                                        <Button ariaLabel="remove task button" onClick={() => onRemove({...task})} colorContext="error" label="Remove" icon={Icons.bsTrash}></Button>
                                        <Show when={task.completed}>
                                            <Button label="Mark as TODO" colorContext="warn" ariaLabel="task complete checkbox" icon={Icons.faSolidListCheck} onClick={(e) => (onToggleTaskStatus({...task}, !task.completed))}></Button>   
                                        </Show>
                                        <Show when={!task.completed}>
                                            <Button label="Mark as Done" colorContext="secondary" ariaLabel="task complete checkbox" icon={Icons.bsCheck} onClick={(e) => (onToggleTaskStatus({...task}, !task.completed))}></Button>   
                                        </Show>  
                                </Grid>
                            </div>
                        )}
                    </For>
        </div>

    );
};

export default TaskList;
