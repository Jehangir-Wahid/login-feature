import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ValidateInput from "../middleware/ValidateInput";

export default () => {
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (
      ValidateInput(username.value, "username") &&
      ValidateInput(password.value, "password")
    ) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password.");
    }
    e.preventDefault();
  };

  return (
    <div>
      <Header headerText="Login" />
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" placeholder="Your Name or Email" {...username} />
          <span>Name 5 to 20 characters or Email.</span>
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Alphabets and/or Numbers"
            {...password}
          />
          <span>Password 6 to 20 characters.</span>
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
