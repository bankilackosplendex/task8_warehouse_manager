import "./LoginPage.scss";
import LoginForm from "../../components/authentication/LoginForm.tsx";
import BackButton from "../../components/common/BackButton.tsx";

function LoginPage() {
  return (
    <div className="loginPage">
      <div className="loginPage__header">
        <BackButton />
        <h2 className="loginPage__header__title">Login</h2>
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
