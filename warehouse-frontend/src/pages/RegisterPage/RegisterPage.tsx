import "./RegisterPage.scss";
import RegisterForm from "../../components/authentication/RegisterForm.tsx";
import BackButton from "../../components/common/BackButton.tsx";

function RegisterPage() {
  return (
    <div className="registerPage">
      <div className="registerPage__header">
        <BackButton />
        <h2 className="registerPage__header__title">Registration</h2>
      </div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
