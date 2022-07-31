import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import styles from './Score.module.scss'

const Toolbar = ({
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
    <div className={`${styles.toolbar} p-1 p-sm-2`}>
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

export const Score = ({
  view, score, time,
}) => {
  const { minutes, seconds } = time
  return (
    <Row className="g-2">
      <Col xs={4} xxl={12}>
        <Toolbar
          title="Time:"
          time={{ minutes, seconds }}
          icon="bx bx-time"
        />
      </Col>

      <Col xs={4} xxl={12}>
        <Toolbar
          title="View:"
          value={view}
          icon="bx bx-bell"
        />
      </Col>
      <Col xs={4} xxl={12}>
        <Toolbar
          title="Score:"
          value={score}
          icon="bx bx-shield-alt-2"
        />
      </Col>
    </Row>
  )
}

Score.propTypes = {
  view: PropTypes.number,
  score: PropTypes.number,
  time: PropTypes.object,
}
Score.defaultProps = {
  view: null,
  score: null,
  time: {},
}
