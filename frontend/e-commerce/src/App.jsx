import { useState } from 'react'
import './App.css'
import { Cart } from './components/Cart'
import { Filter } from './components/Filter'
import { Navbar } from './components/Navbar'
import { ResultInfoBar } from './components/ResultInfoBar'
import { ResultTable } from './components/ResultTable'
import { SearchProvider } from './contexts/SearchContext'

function App() {
  const [isCartComponentCartComponentVisible, setIsCartComponentCartComponentVisible] = useState(false);

  return (
    <SearchProvider>
      <Navbar
        setIsCartComponentCartComponent={setIsCartComponentCartComponentVisible} />
      <div className={isCartComponentCartComponentVisible ? 'content-ResultandFilter' : 'content-ResultandFilter-withoutCart'}>
        <ResultInfoBar />
        <Filter />
        <ResultTable isCartComponentCartComponentVisible={isCartComponentCartComponentVisible} />
        <Cart isCartComponentCartComponentVisible={isCartComponentCartComponentVisible}/>
      </div>
    </SearchProvider>
  )
}

export default App
