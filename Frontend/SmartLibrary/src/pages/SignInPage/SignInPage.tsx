import styles from "./signIn.module.css";
import AuthButtonsComponent from "@features/auth/components/auth-component.js";
import bcrypt from "bcryptjs";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost:8080/api/users");
            const users = await response.json();

            const user = users.find((u: any) => u.email === email);

            if (!user) {

                navigate("/sign-up");
                return;
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash);

            if (!isMatch) {

                setErrorMessage("Внесовте погрешна лозинка. Обидете се повторно.");
                return;
            }
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/control-panel");
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("Настана грешка. Обидете се повторно.");
        }
    };

    return (
        <div className={styles.authContainer}>
            <AuthButtonsComponent activeTab="sign-in" />
            <form onSubmit={handleSubmit}>
                <label>Емаил адреса</label>
                <input type="email" placeholder="example@edu.com" value={email}
                       onChange={(e) => setEmail(e.target.value)}/>

                <label>Лозинка</label>
                <input type="password" placeholder="Внесете лозинка"  value={password}
                       onChange={(e) => setPassword(e.target.value)} />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit">Најави се</button>
            </form>
        </div>
    );
};

export default SignInPage;
