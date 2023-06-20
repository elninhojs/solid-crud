import { For, Resource } from "solid-js";
import { Task } from "../../api/types";

interface Props {
    onRemove: (task: Task) => Promise<void>
    onToggleTaskStatus: (task: Task, status: boolean) => Promise<void>
    data: Resource<Task[]>
}
const TaskList = ({ onRemove, onToggleTaskStatus, data }: Props) => {
    return (
        <div class={(data.loading && "loading") || ""}>
                <div class="text-center">Showing {(data() as Task[]) && (data() as Task[]).length || 0 } task{(data() as Task[]) && (data() as Task[]).length > 1 && "s" || ""}</div>
                <For each={data()}>
                    {(task: Task) => (
                        <div aria-label="task record row" class="row row-cols-3 mb-3 justify-content-center">
                            <button class="btn btn-danger w-auto" onClick={() => onRemove({...task})}>
                                Remove
                            </button>
                            <div class={`bg-light p-2 mx-2 ${task.completed && 'text-decoration-line-through text-success'}`}>
                                {task.text}
                            </div>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                role="button"
                                class="form-check-input h-auto px-3"
                                onClick={(e) => {
                                    onToggleTaskStatus({...task}, !task.completed)
                                }}
                            />
                        </div>
                    )}
                </For>
        </div>

    );
};

export default TaskList;
