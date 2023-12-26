import { Accordion } from 'react-bootstrap'

import { Hero } from './components/home/Hero'
import { Sort } from './components/home/Sort'
import { Filter } from './components/home/Filter'
import { Search } from './components/home/Search'
import { Contact } from './components/home/Contact'
import { Products } from './components/home/Products'

function App() {
  return (
    <div className="main-content">
      <Hero />

      <div className="local-bootstrap">
        <Accordion className="filters">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Advanced Search </Accordion.Header>
            <Accordion.Body>
              <Search />
              <Filter />
              <Sort />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="products">
        <Products />
      </div>
      <Contact />
    </div>
  )
}

export default App
