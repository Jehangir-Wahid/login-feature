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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (
      ValidateInput(username.value, "username") &&
      ValidateInput(password.value, "password")
    ) {
      setIsLoading(true);
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
          setIsLoading(false);
          navigate("/dashboard");
        })
        .catch((err) => {
          dispatch(setError(err.response.data.error));
          setIsLoading(false);
          console.log("Error occurred: ", err);
        });
    } else {
      dispatch(setError("Invalid username or password."));
    }
    e.preventDefault();
  };

  return (
    <>
      <Header headerText="Login" />
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col col-md-6">
              <div className="card mb-2">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group pb-3">
                      <label htmlFor="exampleInputEmail1">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="someone@example.com"
                        {...username}
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        Username 5 to 20 characters or Email.
                      </small>
                    </div>
                    <div className="form-group pb-3">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        {...password}
                      />
                      <small id="passwordHelp" className="form-text text-muted">
                        Alphabets and/or Numbers (6 to 20 characters).
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        className="btn btn-primary col-md-12"
                        value="Login"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col col-md-6">
              {isLoading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : null}
              {error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
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
