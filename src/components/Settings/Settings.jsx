import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { Button } from 'reactstrap'
import { game } from '../../state'
import { RangeField } from './RangeField'
import { RangeTest } from './RangeTest'

export const Settings = ({ onClose }) => {
  const dispatch = useDispatch()
  const { setting } = useSelector(game.selectors.gameSelector)

  const onSubmit = (values) => {
    dispatch(game.methods.setting(values))
    onClose()
  }
  const hendlerChangeTestRange = (rangeValue) => {
    console.log(rangeValue)
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={setting}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <br />
          <br />
          <br />
          <br />
          <RangeTest
            min={0}
            max={100}
            step={1}
            value={50}
            onChange={hendlerChangeTestRange}
          />
          {/* <RangeField
            name="time"
            value={setting.time}
            max={120}
            label="Choose a time"
          />
          <RangeField
            name="quantity"
            value={setting.quantity}
            max={6}
            label="Choose a quantity cards"
          /> */}
          {/* <Button type="submit">Apply</Button>
          <Button
            onClick={onClose}
            className="ms-2"
          >
            Close
          </Button> */}
        </form>
      )}
    </Form>
  )
}

Settings.propTypes = {
  onClose: PropTypes.func,
}
Settings.defaultProps = {
  onClose: () => { },
}
