import { createResource } from 'solid-js'
import type { Component, Setter } from 'solid-js'
import TopBar from './components/topbar/TopBar'
import Box from './components/box/Box'
import InputBar from './components/inputbar/InputBar'
import TaskList from './components/tasklist/TaskList'
import { fetchTasks, addTask, removeTask, editTask } from './api/task'
import {Task} from './api/types'

const apiClient = {fetchTasks, addTask, removeTask, editTask}

const App: Component = () => {
  const [data, {refetch, mutate}] = createResource(fetchTasks);

  const onRemove = async(task: Task, mutate: Setter<Task[]>, api: any = apiClient) => {
    try{
      await api.removeTask(task.id)
      mutate((tasks)=>tasks?.filter(e=>e.id!==task.id))
    }catch(e){
      console.error(e) //TODO show to final user?
    }
  }

  const onAddTask = async(text: String, mutate: Setter<Task[]>, api: any = apiClient) => {
    try{
      const createdRecord = await api.addTask({text, completed: false} as Task)
      mutate((tasks)=>[...tasks, createdRecord])
    }catch(e){
      console.error(e) //TODO show to final user?
    }
  }

  const onEditTask = async(task: Task, completed: boolean, refetch:(info?: unknown)=> Task[] | Promise<Task[] | undefined> | null | undefined, api: any = apiClient) => {
    try{
      await api.editTask({...task, completed});
      await refetch()
    }catch(e){
      console.error(e) //TODO show to final user?
    }
  }

  return (
    <div>
      <TopBar/>
      <div class="container">
        <Box title="Task list">
          <InputBar onAddTask={async (text: string)=>await onAddTask(text, mutate)}></InputBar>
          <TaskList data={data} 
            onRemove={async (task: Task)=> await onRemove({...task}, mutate)} 
            onToggleTaskStatus={async (task: Task, completed: boolean) => await onEditTask(task, completed, refetch)}></TaskList>
        </Box>
      </div>
    </div>
  )
}

export default App
