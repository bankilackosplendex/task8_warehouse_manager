import "./LoginPage.scss";
import LoginForm from "../../components/authentication/LoginForm.tsx";
import BackButton from "../../components/common/BackButton.tsx";

function LoginPage() {
  return (
    // Login page
    <div className="loginPage">
      {/* Page header */}
      <div className="loginPage__header">
        <BackButton />
        <h2 className="loginPage__header__title">Login</h2>
      </div>
      {/* Login form */}
      <LoginForm />
    </div>
  );
}

export default LoginPage;
