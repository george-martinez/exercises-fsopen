import Authors from "./components/Authors"
import Books from './components/Books'
import NewBook from './components/NewBook'
import {
  Routes, Route, Link
} from 'react-router-dom'
import { useApolloClient, useQuery } from '@apollo/client'

import { ALL_AUTHORS, ME } from './queries'
import { useEffect, useState } from "react"
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { useNavigate } from "react-router-dom"
import Recommendations from "./components/Recommendations"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [user, setUser] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()
  const userResult = useQuery(ME)
  
  useEffect(() => {
    if(userResult?.data?.me?.username){
      setUser(userResult.data.me)
    }
  }, [token, userResult?.data])
  
  const allAuthorsResult = useQuery(ALL_AUTHORS)
  
  if(allAuthorsResult.loading) {
    return <div>loading...</div>
  }
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  return (
    <div>
        <Notify errorMessage={errorMessage} />
      <div>
        <Link to="/" style={{padding: "3px"}}><button>home</button></Link>
        <Link to="authors" style={{padding: "3px"}}><button>authors</button></Link>
        <Link to="books" style={{padding: "3px"}}><button>books</button></Link>
        
        {token 
          ?
          <>
            <Link to="add" style={{padding: "3px"}}><button>add book</button></Link>
            <Link to="recommendations" style={{padding: "3px"}}><button>recommendations</button></Link>
            <button onClick={logout}>logout</button>
          </>  
          : <Link to="login" style={{padding: "3px"}}><button>login</button></Link>
        }
      </div>

      <Routes>
        <Route path='/' element={token ? `Welcome to the library ${user.username}`: 'Welcome to the library. Login if you want to add a book.'}/>
        <Route path='/authors' element={<Authors setError={setErrorMessage}/>}/>
        <Route path='/books' element={<Books />}/>
        <Route path='/recommendations' element={<Recommendations user={user} />}/>
        <Route path='/add' element={<NewBook setError={setErrorMessage} />}/>
        <Route path='/login' element={<LoginForm setToken={setToken} setError={setErrorMessage} setUser={setUser} />}/>
      </Routes>
    </div>
  )
}

export default App
