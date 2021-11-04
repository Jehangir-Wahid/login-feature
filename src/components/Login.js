import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setError } from "../redux/actions/loginActions";
import Header from "./Header";
import ValidateInput from "../middleware/ValidateInput";

export default () => {
  const username = useFormInput("");
  const password = useFormInput("");
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (
      ValidateInput(username.value, "username") &&
      ValidateInput(password.value, "password")
    ) {
      axios({
        method: "POST",
        url: "https://reqres.in/api/login",
        headers: {
          "content-type": "application/json",
        },
        data: {
          username: username.value,
          password: password.value,
        },
      })
        .then((response) => {
          // console.log(response.data);
          dispatch(
            loginUser({ username: username.value, token: response.data.token })
          );
          navigate("/dashboard");
        })
        .catch((err) => {
          dispatch(setError(err.response.data.error));
          console.log("Error occurred: ", err);
        });
    } else {
      dispatch(setError("Invalid username or password."));
    }
    e.preventDefault();
  };

  return (
    <div>
      <Header headerText="Login" />
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" placeholder="someone@example.com" {...username} />
          <span>Name 5 to 20 characters or Email.</span>
        </label>
        <label>
          Password
          <input type="password" {...password} />
          <span>Alphabets and/or Numbers (6 to 20 characters).</span>
        </label>
        <input type="submit" value="Login" />
      </form>
      <div>{error ? error : ""}</div>
    </div>
  );
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};
