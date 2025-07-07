import "./LoginPage.scss";
import LoginForm from "../../components/authentication/LoginForm.tsx";
import BackButton from "../../components/common/BackButton.tsx";

function LoginPage() {
  return (
    <div className="loginPage">
      <BackButton />
      <h2 className="loginPage__title">Login</h2>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
