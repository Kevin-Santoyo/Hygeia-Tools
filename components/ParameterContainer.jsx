import PropTypes from 'prop-types'
import styles from './ParameterContainer.module.css'

export default function ParameterContainer (props) {
  return (
    <section className={styles.container}>
      {props.children}
    </section>
  )
}

ParameterContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
}
