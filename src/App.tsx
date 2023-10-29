// import './App.css'

import { Products } from './components/home/Products'
import { Hero } from './components/home/Hero'
import { Search } from './components/home/Search'
import { Filter } from './components/home/Filter'

function App() {
  console.log('render app')
  return (
    <div className="main-content">
      <Hero />
      <div className="products">
        <div className="side-bar">
          <Search />
          <Filter />
        </div>

        <Products />
      </div>
    </div>
  )
}

export default App
