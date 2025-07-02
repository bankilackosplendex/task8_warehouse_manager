import "./RegisterPage.scss";
import RegisterForm from "../../components/authentication/RegisterForm.tsx";

function RegisterPage() {
  return (
    <div className="registerPage">
      <h2 className="registerPage__title">Registration</h2>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;