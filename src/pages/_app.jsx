import PropTypes from 'prop-types'
import '@scss/globals.scss'

const App = ({ Component, pageProps }) => <Component {...pageProps} />

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
}
App.defaultProps = {
  pageProps: {},
}

export default App
