import PropTypes from 'prop-types'


const Notification = ({ message }) => (
    <div className='notification'>
        {message}
    </div>
)

Notification.propTypes = {
    message: PropTypes.string.isRequired
}

export default Notification