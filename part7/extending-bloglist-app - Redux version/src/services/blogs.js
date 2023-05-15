import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const addComment = (id, comment) => {
	const request = axios.post(`${baseUrl}/${id}/comments`, { comment })

	return request.then(response => response.data)
}

const create = async newObject => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = (id, newObject) => {
	const config = {
		headers: { Authorization: token },
	}

	const request = axios.put(`${baseUrl}/${id}`, newObject, config)
	return request.then(response => response.data)
}

const getBlog = id => {
	const config = {
		headers: { Authorization: token },
	}

	const request = axios.get(`${baseUrl}/${id}`, config)
	return request.then(response => {
		delete response.data[0].user
		return response.data[0]
	})
}

const remove = id => {
	const config = {
		headers: { Authorization: token },
	}

	const request = axios.delete(`${baseUrl}/${id}`, config)
	return request.then(response => response.data)
}

const exports = {
	getAll,
	create,
	update,
	setToken,
	remove,
	getBlog,
	addComment,
}

export default exports
