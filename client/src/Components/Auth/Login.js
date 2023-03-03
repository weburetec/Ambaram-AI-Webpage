import React, { useState } from "react";
import "../Css_Files/signup.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Input from "../../controls/input";
import { FiEye } from "react-icons/fi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../Redux/Actions/userAction";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInValidationSchema = Yup.object().shape({
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
    dispatch(signIn({values,navigate}));
  };
  return (
    <>
      <div className="signupPage">
        <div className="form">
          <p className="batch">Login to your account</p>
          <Formik
            initialValues={{
              email: "",
              password: "",
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
                  label="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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
                <button type="submit" onClick={handleSubmit}>Login</button>
                <p className="already">
                  New to monday?{" "}
                  <span
                    style={{ cursor: "pointer", color: "#6161ff" }}
                    onClick={() => navigate("/signup")}
                  >
                    Create a new account
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

export default Login;
