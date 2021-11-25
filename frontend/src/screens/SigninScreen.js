import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
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
            <div class="login-form">
              <h2>Login</h2>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <form onSubmit={submitHandler}>
                <div class="group-input">
                  <label htmlFor="email">Email address *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="group-input">
                  <label for="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" class="site-btn login-btn">
                  Sign In
                </button>
              </form>
              <div class="switch-login">
                <Link to="/register" class="or-login">
                  Or Create An Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
