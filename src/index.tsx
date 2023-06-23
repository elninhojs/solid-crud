import { render } from 'solid-js/web'
import App from './App'
import './index.css'
import './components/colors.css'
import { GlobalContextProvider } from './context/store'
import { NotificationProvider } from './components/notification/Notification'

render(() => <GlobalContextProvider>
                <NotificationProvider>
                    <App />
                </NotificationProvider>
    </GlobalContextProvider>, document.getElementById('root') as HTMLElement)
