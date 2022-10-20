import { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('loggin in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggeduseronblogapp', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  return(
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>

        {
          errorMessage !== null ?
            <Notification message={errorMessage} />
            : null
        }
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default LoginForm