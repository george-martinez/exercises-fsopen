import Authors from "./components/Authors"
import Books from './components/Books'
import NewBook from './components/NewBook'
import {
  Routes, Route, Link
} from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from './queries'


const App = () => {
  const result = useQuery(ALL_AUTHORS)

  if(result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <Link to="authors" style={{padding: "3px"}}><button>authors</button></Link>
        <Link to="books" style={{padding: "3px"}}><button>books</button></Link>
        <Link to="add" style={{padding: "3px"}}><button>add book</button></Link>
      </div>

      <Routes>
        <Route path='/authors' element={<Authors />}/>
        <Route path='/books'element={<Books />}/>
        <Route path='/add' element={<NewBook />}/>
      </Routes>
    </div>
  )
}

export default App
