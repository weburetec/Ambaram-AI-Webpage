import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";
import "../../Components/Css_Files/input.scss"

const Input = ({ label, name, type, ...rest }) => {
  return (
    <div className="inputContainer">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        key={name.toUpperCase()}
        {...rest}
        id={name}
        placeholder={label}
      />
      <ErrorMessage component="p" className="error" name={name} />
    </div>
  );
};

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
