import styles from '../styles/auth.module.css';
import AuthButtonsComponent from "../components/auth-component.tsx";

const SignIn = () => {
    return (
        <div className={styles['auth-container']}>
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

export default SignIn;
