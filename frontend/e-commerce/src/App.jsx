import './App.css'
import { Cart } from './components/Cart'
import { Filter } from './components/Filter'
import { Navbar } from './components/Navbar'
import { ResultInfoBar } from './components/ResultInfoBar'
import { ResultTable } from './components/ResultTable'
import { SearchProvider } from './contexts/SearchContext'

function App() {
  return (
    <SearchProvider>
      <Navbar />
      <div className='content-ResultandFilter'>
        <ResultInfoBar />
        <Filter/>
        <ResultTable />
        <Cart></Cart>
      </div>
    </SearchProvider>
  )
}

export default App
