import { Task } from "./types";
import {v4 as uuidv4} from 'uuid';
import { API_HOST } from "../config";

/**
 * Dummy fn to make the fetch "slower" visually only
 */
const sleep = (time: number) => new Promise(ok => setTimeout(ok, time))

export async function fetchTasks(){
    await sleep(800)
    const response = await fetch(`${API_HOST}/task`);
    const results = await response.json();
    return results as Task[];
}

export async function addTask(input: Task){
    const task = {...input, id: uuidv4()}
    const response = await fetch(`${API_HOST}/task`, {method: "POST", body: JSON.stringify(task),  headers: {
        "Content-Type": "application/json",
      }});
    return task;
}

export async function editTask(input: Task){
    const task = {...input}
    await fetch(`${API_HOST}/task/${task.id}`, {method: "PUT", body: JSON.stringify(task),  headers: {
        "Content-Type": "application/json",
      }});
    return task;
}

export async function removeTask(id: string){
    await fetch(`${API_HOST}/task/${id}`, {method: "DELETE"});
    return id;
}