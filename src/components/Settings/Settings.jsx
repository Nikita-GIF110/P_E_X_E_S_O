import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './Settings.module.scss'

const FormItem = ({
  label, type, value, onChange,
}) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={styles.label}>
    {label}
    <input
      type={type}
      value={value}
      className={styles.range}
      onChange={onChange}
      min={1}
      max={3}
    />
    <span className={styles.level}>Low</span>
  </label>
)
FormItem.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}
FormItem.defaultProps = {
  onChange: () => {},
  label: null,
  type: 'range',
  value: '',
}

export const Settings = ({ onSubmit }) => {
  const [timeValue, setTimeValue] = useState(1)

  const handlerChange = (event) => {
    const { value } = event.target
    setTimeValue(value)
  }

  return (
    <form
      onSubmit={onSubmit}
      className={styles.form}
    >
      <FormItem
        label="Choose the difficulty level"
        onChange={handlerChange}
        value={timeValue}
      />

      <button type="submit">
        Ready
      </button>
    </form>
  )
}

Settings.propTypes = {
  onSubmit: PropTypes.func,
}
Settings.defaultProps = {
  onSubmit: () => {},
}
