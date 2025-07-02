import "./RegisterForm.scss";

function RegisterForm() {
  return (
    // Registration form
    <form className="registerForm" method="post">
      {/* Email */}
      <label className="registerForm__emailLabel" htmlFor="email">
        Email
      </label>
      <input
        className="registerForm__emailField"
        type="email"
        name="email"
        required
      />
      {/* Name */}
      <label className="registerForm__nameLabel" htmlFor="name">
        Name
      </label>
      <input
        className="registerForm__nameField"
        type="text"
        name="name"
        required
      />
      {/* Password */}
      <label className="registerForm__passwordLabel" htmlFor="password">
        Password
      </label>
      <input
        className="registerForm__passwordField"
        type="password"
        name="password"
        required
      />
      <button className="registerForm__button" type="submit">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
