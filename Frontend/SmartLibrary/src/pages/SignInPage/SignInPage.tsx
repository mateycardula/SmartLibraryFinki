import styles from "./signIn.module.css";
import AuthButtonsComponent from "@features/auth/components/auth-component";

const SignInPage = () => {
  return (
    <div className={styles.authContainer}>
      <AuthButtonsComponent activeTab="sign-in" />
      <form>
        <label>Емаил адреса</label>
        <input type="email" placeholder="example@edu.com" />

        <label>Лозинка</label>
        <input type="password" placeholder="Внесете лозинка" />

        <button type="submit">Најави се</button>
      </form>
    </div>
  );
};

export default SignInPage;
