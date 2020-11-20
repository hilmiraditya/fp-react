import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setUserSession } from '../../service/SessionStorage';

const baseUrl = 'http://hilmi.pw';

export default function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    Axios.post(`${baseUrl}/login`, { email, password })
      .then((response) => {
        console.log(response.data);
        setUserSession(response.data.accessToken);
        history.replace('profile');
      });
  };

  return (
    <div className="container">
      <form className="form-signin" onSubmit={handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <div className="row">
          <div className="col">
            <input
              type="text"
              name="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="Enter Email"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              placeholder="Enter Password"
            />
            <input type="submit" value="Login" />
          </div>
        </div>
      </form>
    </div>
  );
}
