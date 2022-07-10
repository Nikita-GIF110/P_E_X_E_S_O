import PropTypes from 'prop-types'
import styles from './OverlayPopup.module.scss'

export const OverlayPopup = ({ children, isShow, onClose }) => (
  <div className={styles.container} role="dialog">
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <div
      className={styles.overlay}
      role="button"
      tabIndex={0}
      onClick={onClose}
    />
    { children }
  </div>
)

OverlayPopup.propTypes = {
  children: PropTypes.node.isRequired,
  isShow: PropTypes.bool,
  onClose: PropTypes.func,
}
OverlayPopup.defaultProps = {
  isShow: false,
  onClose: () => {},
}
