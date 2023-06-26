import { Accessor, Setter, createContext, useContext, createSignal } from "solid-js";

interface ContextProps {
    todoTasks: Accessor<number>,
    setTodoTasks: Setter<number>,
    doneTasks: Accessor<number>,
    setDoneTasks: Setter<number>
}

const GlobalContext = createContext<ContextProps>();

export function GlobalContextProvider(props: any){
    const [todoTasks, setTodoTasks] = createSignal(0)
    const [doneTasks, setDoneTasks] = createSignal(0)
    
    return (<GlobalContext.Provider value={{todoTasks, setTodoTasks, doneTasks, setDoneTasks}}>
        {props.children}
    </GlobalContext.Provider>)
}

export const useGlobalContext = () => useContext(GlobalContext)!