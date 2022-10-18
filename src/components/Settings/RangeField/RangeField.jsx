import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Field as FormField } from 'react-final-form'
import {
  FormGroup,
  Input,
  Label,
} from 'reactstrap'

import styles from './RangeField.module.scss'

export const RangeField = ({
  label,
  name,
  max,
  min,
  step,
  value,
  badgeValue,
}) => {
  const [inputValue, setInputValue] = useState(value)
  const [badgePosition, setBadgePosition] = useState(0)

  const handlerChange = (event, input) => {
    input.onChange(event.target.value)
    setInputValue(event.target.value)
  }

  useEffect(() => {
    const percentage = Math.ceil((inputValue * 100) / max)
    setBadgePosition(percentage)
  }, [inputValue])

  return (
    <FormGroup>
      <Label className="d-block m-0">
        <FormField name={name}>
          {({ input }) => (
            <div className={styles.wrapper}>
              <div
                className={styles.badge}
                style={{ left: `${badgePosition}%` }}
              >
                {inputValue}
              </div>
              <input
                {...input}
                type="range"
                value={inputValue}
                min={min}
                max={max}
                step={step}
                className={styles.input}
                onChange={(event) => handlerChange(event, input)}
              />
            </div>
          )}
        </FormField>
        {label}
      </Label>
    </FormGroup>
  )
}
RangeField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  badgeValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}
RangeField.defaultProps = {
  label: null,
  name: null,
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  badgeValue: null,
}
