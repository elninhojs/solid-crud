import { createContext, useContext, createSignal, For, Show, JSX } from "solid-js"
import styles from './Notification.module.css'
import Icon, { Icons } from "../icon/Icon"


interface NotificationProps {
    children?: JSX.Element
    addInfoMessage: (text: string)=>()=>void
    addErrorMessage: (text: string)=>()=>void
    addSuccessMessage: (text: string)=>()=>void
    addWarnMessage: (text: string)=>()=>void
}

const NotificationContext = createContext<NotificationProps>();
export const useNotificationContext = () => useContext(NotificationContext)!

export interface NotificationData {
    id: string,
    severity: 'warn' | 'error' | 'info' | 'success',
    text: string
}


export function NotificationProvider (props: NotificationProps) {
    const [notifications, setNotifications] = createSignal([] as NotificationData[])

    const addInfoMessage = (message: string) => notify(message, 'info')
    const addWarnMessage = (message: string) => notify(message, "warn")
    const addErrorMessage = (message: string) => notify(message, "error")
    const addSuccessMessage = (message: string) => notify(message, "success")
    
    
    
    const remove = (id: string) => {
        setNotifications && setNotifications(p=>[...p.filter(n=>n.id!==id)])
    }
    
    const notify = (message: string, severity: 'warn' | 'error' | 'info' | 'success') => {
        const id = crypto.randomUUID()
        setNotifications && setNotifications((p)=>[...p, {id, text: message, severity} as NotificationData])
        return () => { remove(id) }
    }

    return (<NotificationContext.Provider value={{addInfoMessage, addErrorMessage, addWarnMessage, addSuccessMessage}}>
                <div class={styles.wrapper}>
                    <For each={notifications()}>
                        {(notification: NotificationData)=>
                            <div classList={{[styles.notification]: true, [styles[notification.severity]]:true}}
                                onClick={() => remove(notification.id)}>
                                    <div class={styles.icon}>
                                        <Show when={notification.severity === "error"}>
                                            <Icon name={Icons.vsError}></Icon>
                                        </Show>
                                        <Show when={notification.severity === "warn"}>
                                            <Icon name={Icons.vsWarning}></Icon>
                                        </Show>
                                        <Show when={notification.severity === "success"}>
                                            <Icon name={Icons.faSolidCheck}></Icon>
                                        </Show>
                                        <Show when={notification.severity === "info"}>
                                            <Icon name={Icons.faSolidInfoCircle}></Icon>
                                        </Show>
                                    </div>
                                {notification.text}
                            </div>
                        }
                    </For>
                </div>
            {props.children}
    </NotificationContext.Provider>)
}