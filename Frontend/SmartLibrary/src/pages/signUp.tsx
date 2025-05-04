import styles from "../styles/auth.module.css";
import AuthButtonsComponent from "../features/auth/components/auth-component.tsx";

const SignUp = () => {
  return (
    <div className={styles["auth-container"]}>
      <AuthButtonsComponent activeTab="sign-up" />
      <form>
        <label>Име и презиме</label>
        <input type="text" placeholder="Вашето име" />

        <label>Улога</label>
        <input type="text" placeholder="На пр. студент, професор..." />

        <label>Емаил адреса</label>
        <input type="email" placeholder="example@edu.com" />

        <label>Лозинка</label>
        <input type="password" placeholder="Внесете лозинка" />

        <button type="submit">Регистрирај се</button>
      </form>
    </div>
  );
};

export default SignUp;
