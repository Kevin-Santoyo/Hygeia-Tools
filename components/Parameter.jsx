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

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export default function Parameter ({ label, field, options, selected, handleSelect }) {
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

Parameter.propTypes = {
  label: PropTypes.string,
  field: PropTypes.string,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  setOptions: PropTypes.func,
  dependencies: PropTypes.array
}
