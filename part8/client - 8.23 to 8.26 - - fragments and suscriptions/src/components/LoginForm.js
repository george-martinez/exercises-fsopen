import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ME } from '../graphql/queries'
import { LOGIN } from '../graphql/mutations'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setError, setToken, setUser }) => {
  const [username, setUsername] = useState('')
  const [pass, setPassword] = useState('')
  const navigate = useNavigate()

  const [ login, loginResult ] = useMutation(LOGIN, {
    refetchQueries: [{ query: ME }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if(loginResult.data){
      const token = loginResult.data.login.token.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setUser(loginResult.data.login.user)
      navigate('/')
    }
  }, [loginResult.data, navigate, setToken, setUser])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, pass } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={pass}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm