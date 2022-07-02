import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Card.module.scss'

export const Card = ({ label, value, bgColor }) => {
  const [isOpened, setIsOpened] = useState(false)
  const handelOenCard = () => setIsOpened(!isOpened)
  const dataOpened = isOpened && true
  return (
    <div
      className={`${styles.card} ${isOpened ? styles.opened : ''}`}
      data-value={value}
      data-open={dataOpened}
      role="button"
      tabIndex={0}
      onClick={handelOenCard}
    >
      <span className={`${styles.front} ${styles.side}`}>
        <i className="bx bxs-invader" />
      </span>
      <span
        className={`${styles.back} ${styles.side}`}
        role="button"
        tabIndex={0}
        onClick={(event) => event.stopPropagation()}
      >
        {label}
      </span>
    </div>
  )
}
Card.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  bgColor: PropTypes.string,
}
Card.defaultProps = {
  label: null,
  value: null,
  bgColor: null,
}
