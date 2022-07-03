import PropTypes from 'prop-types'
import styles from './Card.module.scss'

export const Card = ({ card, selectCard }) => {
  const {
    label, value, open, done,
  } = card

  const handlerChange = () => {
    selectCard(card)
  }
  const openClass = open ? styles.opened : ''
  const doneClass = done ? styles.done : ''
  const dataOpened = open && true
  return (
    <div
      className={`${styles.card} ${openClass} ${doneClass}`}
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
}
Card.defaultProps = {
  card: {},
  selectCard: () => { },
}
