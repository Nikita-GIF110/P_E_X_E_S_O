import PropTypes from 'prop-types'
import styles from './Card.module.scss'

export const Card = ({ card, index, selectCard }) => {
  const {
    label, value, status, open,
  } = card

  const handlerChange = () => {
    selectCard(index)
  }

  const getClasses = (cardStatus) => {
    if (cardStatus === 'wrong') {
      return styles.wrong
    }
    if (cardStatus === 'correct') {
      return styles.correct
    }
    return ''
  }

  return (
    <div
      className={`${styles.card} ${open ? styles.active : ''} ${getClasses(status)}`}
      data-value={value}
      role="button"
      tabIndex={0}
      onClick={handlerChange}
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
  card: PropTypes.object,
  selectCard: PropTypes.func,
  index: PropTypes.number,
}
Card.defaultProps = {
  card: {},
  selectCard: () => { },
  index: null,
}
