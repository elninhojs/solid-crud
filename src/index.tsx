import { render } from 'solid-js/web'
import App from './App'
import './index.css'
import './components/colors.css'
import { GlobalContextProvider } from './context/store'

render(() => <GlobalContextProvider>
        <App />
    </GlobalContextProvider>, document.getElementById('root') as HTMLElement)
