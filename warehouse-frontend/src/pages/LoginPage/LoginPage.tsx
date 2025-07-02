import "./LoginPage.scss";
import LoginForm from "../../components/authentication/LoginForm.tsx";

function LoginPage() {
  return (
    <div className="loginPage">
      <h2 className="loginPage__title">Login</h2>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
