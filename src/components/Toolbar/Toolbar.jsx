import PropTypes from 'prop-types'
import styles from './Toolbar.module.scss'

export const Toolbar = ({
  title, value, time, icon,
}) => {
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
      {icon && <i className={`${icon} ${styles.icon}`} />}
      <span className={styles.label}>{title}</span>
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
  icon: PropTypes.string,
}
Toolbar.defaultProps = {
  title: null,
  value: null,
  time: null,
  icon: null,
}
