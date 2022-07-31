import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { Button } from 'reactstrap'
import { RangeField } from '@components'

export const Settings = ({ onClose, onSubmit }) => (
  <Form
    onSubmit={onSubmit}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div>
          <div>Choose a time</div>
          <RangeField name="time" max={3} />
        </div>
        <div>
          <div>Choose a quantity cards</div>
          <RangeField name="cards" max={4} />
        </div>
        <Button type="submit">Apply</Button>
        <Button
          onClick={onClose}
          className="ms-2"
        >
          Close
        </Button>
      </form>
    )}
  </Form>
)

Settings.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
}
Settings.defaultProps = {
  onClose: () => { },
  onSubmit: () => { },
}
