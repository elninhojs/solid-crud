import { For, Resource } from "solid-js";
import { Task } from "../../api/types";
import { IconButton} from "@suid/material"
import DeleteIcon from "@suid/icons-material/Delete";
import { Checkbox } from "@suid/material"

interface Props {
    onRemove: (task: Task) => Promise<void>
    onToggleTaskStatus: (task: Task, status: boolean) => Promise<void>
    data: Resource<Task[]>
}
const TaskList = ({ onRemove, onToggleTaskStatus, data }: Props) => {
    return (
        <div class={`task-list-content ${(data.loading && "loading") || ""}`}>
                <div class="text-center task-list-records-counter">Showing {(data() as Task[]) && (data() as Task[]).length || 0 } task{(data() as Task[]) && (data() as Task[]).length > 1 && "s" || ""}</div>
                
                    <For each={data()}>
                        {(task: Task) => (
                            <div class="task-list-container" aria-label="task record row">
                                    <IconButton color="primary">
                                        <DeleteIcon onClick={() => onRemove({...task})} aria-label="remove task button" />
                                    </IconButton>
                                    <div aria-label="task text" class={`${task.completed && 'lined-text' || ''}`}>
                                        {task.text}
                                    </div>
                                    <Checkbox inputProps={{ "aria-label": "task complete checkbox" }} checked={task.completed} onClick={(e) => {
                                            onToggleTaskStatus({...task}, !task.completed)
                                        }}></Checkbox>
                            </div>
                        )}
                    </For>
                </div>
                
        

    );
};

export default TaskList;
