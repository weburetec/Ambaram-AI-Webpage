import React, { useState } from "react";
import "../Css_Files/signup.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Input from "../../controls/input";
import { FiEye } from "react-icons/fi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../Redux/Actions/userAction";
import Select from "react-select";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInValidationSchema = Yup.object().shape({
    userName: Yup.string().required("UserName is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .test(
        "regex",
        "Password must be min 6 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase",
        (val) => {
          let regExp = new RegExp(
            "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
          );
          return regExp.test(val);
        }
      ),
  });
  const signInHandler = async (values) => {
    dispatch(signUp({values,navigate}))
  };
  const options = [
    { value: "USER", label: "User" },
    { value: "ADMIN", label: "Admin" },
  ];
  const customStyles = {
    control: base => ({
      ...base,
      height:"6vh",
      marginBottom: "2.5vh",
    })
  };
  return (
    <>
      <div className="signupPage">
        <div className="form">
          <p className="batch">Create a new account</p>
          <Formik
            initialValues={{
              userName: "",
              email: "",
              password: "",
              role:""
            }}
            onSubmit={signInHandler}
            validationSchema={signInValidationSchema}
            enableReinitialize
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              handleBlur,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Input
                  label="User Name"
                  name="userName"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div>
                  <label>Role</label>
                  <Select
                    options={options}
                    name="role"
                    styles={customStyles}
                    placeholder="Role"
                    onChange={(val) => setFieldValue("role",val.value)}
                  />
                </div>
                <div className="password">
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <div>
                    {showPassword ? (
                      <FiEye onClick={() => setShowPassword(false)} />
                    ) : (
                      <AiOutlineEyeInvisible
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>
                <button type="submit" onClick={handleSubmit}>Signup</button>
                <p className="already">
                  Already have an account?{" "}
                  <span
                    style={{ cursor: "pointer", color: "#6161ff" }}
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </span>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Signup;
