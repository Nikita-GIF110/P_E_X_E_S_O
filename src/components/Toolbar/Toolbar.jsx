import PropTypes from 'prop-types'
import styles from './Toolbar.module.scss'

export const Toolbar = ({ title, value, time }) => {
  let viewValue
  if (time) {
    viewValue = (
      <span className={styles.value}>
        {time.minutes}
        {' '}
        :
        {' '}
        {time.seconds}
      </span>
    )
  } else {
    viewValue = (
      <span className={styles.value}>
        {value}
      </span>
    )
  }

  return (
    <div className={styles.toolbar}>
      {title}
      :
      {' '}
      {viewValue}
    </div>
  )
}
Toolbar.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  time: PropTypes.object,
}
Toolbar.defaultProps = {
  title: null,
  value: null,
  time: null,
}
