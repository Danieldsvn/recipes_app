import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [isDisabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangePass = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleValidation = () => {
    const emailRegExp = /^([a-z0-9]{1,}[._]{0,1}[a-z0-9]{1,})*(@[a-z0-9]{1,}.com)$/i;
    const minPass = 6;
    if (password.length <= minPass || !email.match(emailRegExp)) {
      return setDisabled(true);
    }
    return setDisabled(false);
  };

  const history = useHistory();

  const submitInfo = () => {
    const storage = localStorage;
    storage.setItem('cocktailsToken', 1);
    storage.setItem('mealsToken', 1);
    storage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  useEffect(() => {
    handleValidation();
  });

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          placeholder="E-mail"
          value={ email }
          onChange={ onChangeEmail }
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          placeholder="Password"
          value={ password }
          onChange={ onChangePass }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ submitInfo }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
