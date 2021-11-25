import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div class="register-login-section spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 offset-lg-3">
            <div class="register-form">
              <h2>Register</h2>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <form onSubmit={submitHandler}>
                <div class="group-input">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div class="group-input">
                  <label htmlFor="email">Email address *</label>
                  <input
                    type="text"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="group-input">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="text"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="group-input">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="text"
                    id="confirmPassword"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" class="site-btn register-btn">
                  REGISTER
                </button>
              </form>
              <div class="switch-login">
                <Link to={`/signin?redirect=${redirect}`} class="or-login">
                  Or Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
