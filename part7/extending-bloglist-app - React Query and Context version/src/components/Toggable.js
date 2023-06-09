import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from './StyledComponents'

const Toggable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return { toggleVisibility }
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button $primary onClick={toggleVisibility}>
					{props.buttonLabel}
				</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button $primary onClick={toggleVisibility}>
					cancel
				</Button>
			</div>
		</div>
	)
})

Toggable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

Toggable.displayName = 'Toggable'

export default Toggable
