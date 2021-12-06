import PropTypes from 'prop-types'
import styles from './Parameter.module.css'
import Select from 'react-select'

// TODO: Fix bug causing options at end of select to be invisible
const selectStyles = {
  menu: (provided, state) => ({
    ...provided,
    // display: 'block',
    position: 'static',
    // border: '2px solid red'
    height: '300px',
    overflowY: 'scroll'
  }),
  // dropdownIndicator: () => ({
  //   display: 'none'
  // }),
  indicatorsContainer: (provided, state) => ({
    display: 'none'
  }),
  option: (provided, { isSelected, isFocused }) => ({
    ...provided,
    backgroundColor: isSelected
      ? '#335a42'
      : 'white'
  }),
  singleValue: () => ({
    backgroundColor: '#335a42',
    color: 'white',
    padding: '5px'
  })
  // // input: (provided, state) => ({
  // //   backgroundColor: 'red'
  // // }),
  // control: (provided) => ({
  //   ...provided,
  //   backgroundColor: 'auto'
  //   border:
  //   // borderBottom: '1px solid black'
  // })
}

const noncountries = ['All Samples', 'Domestic Samples', 'Combined Imports']

export default function Parameter({ label, field, options, selected, handleSelect }) {
  return (
    <div className={styles.parameterWrapper}>
      <div className={styles.title}>
        {label}
      </div>
      <Select
        styles={selectStyles}
        value={{ value: selected, label: selected }}
        options={options.map(opt => ({ value: opt, label: opt }))}
        onChange={(val) => handleSelect(field, val.value)}
        menuIsOpen={true}
      />
    </div>
  )
}

export function OriginParameter({ label, field, options, selected, handleSelect }) {
  const noncountries = ['All Samples', 'Domestic Samples', 'Combined Imports']
  var notcountries = options.filter((opt) => {
    if (noncountries.indexOf(opt) !== -1) {
      return opt
    }
  })
  var countries = options.filter((opt) => {
    if (noncountries.indexOf(opt) == -1) {
      return opt
    }
  })
  options = []
  notcountries.map(loc => options.push(loc))
  options.push('Imports By Country')
  countries.map(loc => options.push(loc))
  return (
    <div className={styles.parameterWrapper}>
      <div className={styles.title}>
        {label}
      </div>
      <Select
        styles={selectStyles}
        value={{ value: selected, label: selected }}
        options={options.map((opt) => {
          if (opt == 'Imports By Country') {
            return { value: opt, label: opt, isDisabled: true }
          } else {
            return { value: opt, label: opt }
          }
        })
        }
        onChange={(val) => handleSelect(field, val.value)}
        menuIsOpen={true}
      />
    </div>
  )
}

Parameter.propTypes = {
  label: PropTypes.string,
  field: PropTypes.string,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  setOptions: PropTypes.func,
  dependencies: PropTypes.array
}
