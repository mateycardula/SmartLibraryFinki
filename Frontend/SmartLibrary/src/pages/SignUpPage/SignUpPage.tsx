import styles from "./signUp.module.css";
import AuthButtonsComponent from "@features/auth/components/auth-component";

const SignUpPage = () => {
  return (
    <div className={styles.authContainer}>
      <AuthButtonsComponent activeTab="sign-up" />
      <form>
        <label>Име и презиме</label>
        <input type="text" placeholder="Јован Јованов" />

        <label>Емаил адреса</label>
        <input type="email" placeholder="example@edu.com" />

        <label>Лозинка</label>
        <input type="password" placeholder="Креирај лозинка" />

        <button type="submit">Регистрирај се</button>
      </form>
    </div>
  );
};

export default SignUpPage;
