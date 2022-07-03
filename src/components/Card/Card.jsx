import PropTypes from 'prop-types'
import styles from './Card.module.scss'

export const Card = ({ card, index, selectCard }) => {
  const {
    label, value, done, status,
  } = card

  const handlerChange = () => {
    selectCard(index)
  }
  let dataOpened = false

  const getClasses = (cardStatus) => {
    if (cardStatus === 'active') {
      dataOpened = true
      return styles.opened
    }
    if (cardStatus === 'wrong') {
      return styles.wrong
    }
    if (cardStatus === 'correct') {
      return styles.done
    }
    return ''
  }

  return (
    <div
      className={`${styles.card} ${getClasses(status)}`}
      data-value={value}
      data-open={dataOpened}
      role="button"
      tabIndex={0}
      onClick={handlerChange}
    >
      {!done
        && (
          <>
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
          </>
        )}
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
