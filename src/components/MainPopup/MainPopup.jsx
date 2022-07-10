import PropTypes from 'prop-types'
import { OverlayPopup } from './OverlayPopup'

import styles from './MainPopup.module.scss'

export const MainPopup = ({
  isShow, onClose, children, title,
}) => (
  <div className={`${styles.modal} ${isShow ? styles.show : ''}`}>
    <OverlayPopup onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.header}>{ title }</div>
        { children }
      </div>
    </OverlayPopup>
  </div>
)

MainPopup.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}
MainPopup.defaultProps = {
  isShow: false,
  onClose: () => {},
  title: null,
}
