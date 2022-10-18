import PropTypes from 'prop-types'
import Image from 'next/image'
import styles from './Card.module.scss'

export const Card = ({
  status,
  open,
  image,
  name,
  index,
  selectCard,
}) => {
  const handlerChange = () => {
    selectCard(index)
  }

  const getClasses = (cardStatus) => {
    if (cardStatus === 'correct') {
      return styles.correct
    }
    return ''
  }

  return (
    <div
      className={`${styles.card} ${open ? styles.active : ''} ${getClasses(status)}`}
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
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectPosition="center"
          priority
        />
      </span>
    </div>
  )
}
Card.propTypes = {
  status: PropTypes.string,
  open: PropTypes.bool,
  image: PropTypes.string,
  name: PropTypes.string,
  selectCard: PropTypes.func,
  index: PropTypes.number,
}
Card.defaultProps = {
  status: null,
  open: false,
  image: '',
  name: null,
  selectCard: () => { },
  index: null,
}
