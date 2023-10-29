import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Hero } from './components/home/Hero'

// import './index.css'
import './styles/style.scss'
import App from './App'
import { store } from './redux/store'
import { NavBar } from './components/home/NavBar'
import { Footer } from './components/home/Footer'

import { Fetch } from './components/Fetch'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <header>
      <NavBar />
    </header>
    <Fetch />
    <Footer />
  </Provider>
)
