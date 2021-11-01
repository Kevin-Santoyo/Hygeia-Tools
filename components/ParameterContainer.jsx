import PropTypes from 'prop-types'
import styles from './ParameterContainer.module.css'

export default function ParameterContainer (props) {
  return (
    <div className={styles.outer}>
      <h4>Select Data Parameters</h4>
      <section className={styles.inner}>
      {props.children}
      </section>
    </div>
  )
}

ParameterContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
}
