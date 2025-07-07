import "./RegisterPage.scss";
import RegisterForm from "../../components/authentication/RegisterForm.tsx";
import BackButton from "../../components/common/BackButton.tsx";

function RegisterPage() {
  return (
    <div className="registerPage">
      <BackButton />
      <h2 className="registerPage__title">Registration</h2>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;