import PropTypes from 'prop-types'
import { Toolbar } from '@components'
import styles from './Score.module.scss'

export const Score = ({ counter, score, time }) => {
  const { minutes, seconds } = time
  return (
    <div className={styles.score}>
      <Toolbar
        title="Time"
        time={{ minutes, seconds }}
      />
      <Toolbar
        title="View"
        value={counter}
      />
      <Toolbar
        title="Score"
        value={score}
      />
    </div>
  )
}

Score.propTypes = {
  counter: PropTypes.number,
  score: PropTypes.number,
  time: PropTypes.object,
}
Score.defaultProps = {
  counter: null,
  score: null,
  time: {},
}
