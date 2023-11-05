import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './App.scss'
import './styles/style.scss'

import { store } from './redux/store'
import { NavBar } from './components/home/NavBar'
import { Footer } from './components/home/Footer'

import { FetchData } from './components/FetchData'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <FetchData />
    <header>
      <NavBar />
    </header>

    <Footer />
  </Provider>
)
