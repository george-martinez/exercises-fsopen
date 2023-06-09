import { useState } from 'react'

export const useField = type => {
	const [value, setValue] = useState('')

	const onChange = event => {
		setValue(event.target.value)
	}

	const reset = event => {
		setValue('')
	}

	const field = [
		{
			type,
			value,
			onChange,
		},
		reset,
	]

	return field
}
