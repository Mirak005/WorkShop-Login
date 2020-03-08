import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../js/actions";

function SingUp() {
  const dispatch = useDispatch();
  const errorForm = useSelector(state =>
    state.authReducer.data.data && state.authReducer.data.data.errors
      ? state.authReducer.data.data.errors
      : null
  );
  
  const [cred, setCred] = useState({
    login: "",
    email: "",
    password: ""
  });

  const handelChange = e => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser(cred));
    setCred({
      login: "",
      email: "",
      password: ""
    });
  };

  console.log(errorForm);

  return (
    <>
      <ul>{errorForm ? errorForm.map(el => <li>{el.msg}</li>) : null}</ul>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Login</label>
        <input
          value={cred.login}
          name="login"
          placeholder="Please Enter Your Login..."
          type="login"
          onChange={handelChange}
        />
        <label>E-mail</label>
        <input
          value={cred.email}
          name="email"
          placeholder="Please Enter Your Email..."
          type="email"
          onChange={handelChange}
        />
        <label>Password</label>
        <input
          value={cred.password}
          name="password"
          placeholder="Please Enter Your Password..."
          type="password"
          onChange={handelChange}
        />
        <button> Register </button>
      </form>
    </>
  );
}

export default SingUp;
