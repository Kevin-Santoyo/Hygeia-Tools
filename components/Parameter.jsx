import PropTypes from "prop-types";
import styles from "./Parameter.module.css";
import Select from "react-select";

const selectStyles = {
  menu: (provided, state) => ({
    ...provided,
    // display: 'block',
    position: "static",
    // border: '2px solid red'
    height: "300px",
    overflowY: "hidden",
  }),
  // dropdownIndicator: () => ({
  //   display: 'none'
  // }),
  indicatorsContainer: (provided, state) => ({
    display: "none",
  }),
  option: (provided, { isSelected, isFocused }) => ({
    ...provided,
    backgroundColor: isSelected ? "var(--green)" : "white",
  }),
  singleValue: () => ({
    backgroundColor: "var(--green)",
    color: "white",
    borderRadius: "4px",
    padding: "5px 7px",
  }),
  // // input: (provided, state) => ({
  // //   backgroundColor: 'red'
  // // }),
  // control: (provided) => ({
  //   ...provided,
  //   backgroundColor: 'auto'
  //   border:
  //   // borderBottom: '1px solid black'
  // })
};

export default function Parameter({ label, field, options, selected, handleSelect }) {

  return (
    <div className={styles.parameterWrapper}>
      <div className={styles.title}>{label}</div>
      <Select styles={selectStyles} value={{ value: selected, label: selected }} options={options.map((opt) => ({ value: opt, label: opt }))} onChange={(val) => handleSelect(field, val.value)} menuIsOpen={true} />
    </div>
  );
}

export function FoodParameter({ label, field, options, selected, handleSelect }) {
  const sumFoods = []
  var newOptions = []
  sumFoods.map((opt) => newOptions.push(opt))
  options.map((opt) => newOptions.push(opt))
  return (
    <div className={styles.parameterWrapper}>
      <div className={styles.title}>{label}</div>
      <Select styles={selectStyles} value={{ value: selected, label: selected }} options={newOptions.map((opt) => ({ value: opt, label: opt }))} onChange={(val) => handleSelect(field, val.value)} menuIsOpen={true} />
    </div>
  );
}

export function OriginParameter({ label, field, options, selected, handleSelect, paramType }) {
  const noncountries = ["All Samples", "Domestic Samples", "Combined Imports", "Multiple Countries"];
  var notcountries = options.filter((opt) => {
    if (noncountries.indexOf(opt) !== -1) {
      return opt;
    }
  });
  var countries = options.filter((opt) => {
    if (noncountries.indexOf(opt) == -1) {
      return opt;
    }
  });
  options = [];
  notcountries.map((loc) => options.push(loc));
  countries.map((loc) => options.push(loc));
  if (paramType == "Default") {
    return (
      <div className={styles.parameterWrapper}>
        <div className={styles.title}>{label}</div>
        <Select
          styles={selectStyles}
          value={{ value: selected, label: selected }}
          options={options.map((opt) => { return { value: opt, label: opt } })}
          onChange={(val) => handleSelect(field, val.value)}
          menuIsOpen={true}
        />
      </div>
    );
  } else if (paramType == "Domestic") {
    options = options.filter((opt) => {
      if (opt != "Domestic Samples" && opt != "All Samples") {
        return opt;
      }
    });

    return (
      <div className={styles.parameterWrapper}>
        <div className={styles.title}>{label}</div>
        <Select
          styles={selectStyles}
          value={{ value: selected, label: selected }}
          options={options.map((opt) => {
            if (opt == "Imports By Country") {
              return { value: opt, label: opt, isDisabled: true };
            } else {
              return { value: opt, label: opt };
            }
          })}
          onChange={(val) => handleSelect(field, val.value)}
          menuIsOpen={true}
        />
      </div>
    );
  }
}

Parameter.propTypes = {
  label: PropTypes.string,
  field: PropTypes.string,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  setOptions: PropTypes.func,
  dependencies: PropTypes.array,
};
