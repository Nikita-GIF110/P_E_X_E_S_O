import PropTypes from 'prop-types'
import styles from './Toolbar.module.scss'

export const Toolbar = ({ title, value, time }) => (
  <div className={styles.toolbar}>
    {title}
    :
    {' '}
    {time
      ? (
        <span className={styles.value}>
          {time.minutes}
          {' '}
          :
          {' '}
          {time.seconds}
        </span>
      )
      : (
        <span className={styles.value}>
          {value}
        </span>
      )}
  </div>
)
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
