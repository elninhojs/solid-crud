import { Accessor, createResource, createSignal, onMount} from 'solid-js'
import { Component, Setter } from 'solid-js'
import TopBar from './components/topbar/TopBar'
import Box from './components/box/Box'
import InputBar from './components/inputbar/InputBar'
import TaskList from './components/tasklist/TaskList'
import { fetchTasks, addTask, removeTask, editTask } from './api/task'
import { Task } from './api/types'
import {Messages, addErrorMessage, addSuccessMessage} from './components'
import {useGlobalContext } from './context/store'
const apiClient = { fetchTasks, addTask, removeTask, editTask } //ideally it shoule have an interface

const App: Component = () => {
  const [tasks, setTasks] = createSignal([] as Task[])
  const [data, { refetch, mutate }] = createResource(async ()=> setTasks(await fetchTasks()));
  const {setDoneTasks, setTodoTasks} = useGlobalContext();

  const propagateGlobalState = (tasks: Task[]) => {
      setTodoTasks(tasks?.filter(t=>!t.completed)?.length)
      setDoneTasks(tasks?.filter(t=>t.completed)?.length)
      return tasks
  }

  createResource(tasks, ()=>propagateGlobalState(tasks()))


  const onRemove = async (task: Task, mutate: Setter<Task[]>, api: any = apiClient) => {
    try {
      await api.removeTask(task.id)
      mutate((tasks) => propagateGlobalState(tasks?.filter(e => e.id !== task.id)))
      addSuccessMessage('Successfully removed!');
    } catch (e) {
      addErrorMessage(`Unexpected error! ${e}`);
    }
  }
  
  const onAddTask = async (text: String, mutate: Setter<Task[]>, api: any = apiClient) => {
    try {
      const createdRecord = await api.addTask({ text, completed: false } as Task)
      mutate((tasks) => propagateGlobalState([...tasks, createdRecord]))
      addSuccessMessage('Successfully added!');
    } catch (e) {
      addErrorMessage(`Unexpected error! ${e}`);
    }
  }
  
  const onEditTask = async (task: Task, completed: boolean, refetch: (info?: unknown) => Task[] | Promise<Task[] | undefined> | null | undefined, api: any = apiClient) => {
    try {
      await api.editTask({ ...task, completed });
      await refetch()
      addSuccessMessage('Task marked as completed!');
      propagateGlobalState(tasks())
    } catch (e) {
      addErrorMessage(`Unexpected error! ${e}`);
    }
  }

  return (
    <div>
        <TopBar />
        <Messages></Messages>
        <Box title="Task list">
          <InputBar onAddTask={async (text: string) => await onAddTask(text, mutate)}></InputBar>
          <TaskList data={data}
            onRemove={async (task: Task) => await onRemove({ ...task }, mutate)}
            onToggleTaskStatus={async (task: Task, completed: boolean) => await onEditTask(task, completed, refetch)}></TaskList>
        </Box>
    </div>

  )
}

export default App