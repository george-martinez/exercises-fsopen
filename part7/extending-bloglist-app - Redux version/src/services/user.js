import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async credentials => {
	const response = await axios.get(baseUrl)
	return response.data
}

const getUsersFn = { getUsers }

export default getUsersFn
