import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { store } from '../state/rootStore'

import '@scss/globals.scss'

const App = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
)

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
}
App.defaultProps = {
  pageProps: {},
}

export default App
