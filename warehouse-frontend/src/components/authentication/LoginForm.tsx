import "./LoginForm.scss";

function LoginForm() {
  return (
    <form className="loginForm" method="post">
      <label className="loginForm__emailLabel" htmlFor="email">Email</label>
      <input
        className="loginForm__emailField"
        type="email"
        name="email"
        required
      />
      <label className="loginForm__passwordLabel" htmlFor="password">Password</label>
      <input
        className="loginForm__passwordField"
        type="password"
        name="password"
        required
      />
      <button className="loginForm__button" type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
