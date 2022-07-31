import { useState } from 'react'
import PropTypes from 'prop-types'
import { Field as FormField } from 'react-final-form'
import {
  FormGroup, Input, Label, Badge,
} from 'reactstrap'
import styles from './RangeField.module.scss'

export const RangeField = ({
  label, name, max, min, step,
}) => {
  const [badgePosition, setBadgePosition] = useState(0)

  const handlerChange = (event, input) => {
    input.onChange(event.target.value)
    setBadgePosition(Math.ceil((event.target.value * 100) / max))
  }
  return (
    <FormGroup className="position-relative pt-4">
      <Label className="d-block">
        <FormField name={name}>
          {({ input }) => (
            <>
              <Badge
                color="primary"
                pill
                className={styles.badge}
                style={{
                  left: `${badgePosition - 2}%`,
                }}
              >
                {input.value}
              </Badge>
              <Input
                {...input}
                type="range"
                min={min}
                max={max}
                step={step}
                onChange={(event) => handlerChange(event, input)}
              />
            </>
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
}
RangeField.defaultProps = {
  label: null,
  name: null,
  min: 0,
  max: 100,
  step: 1,
}
