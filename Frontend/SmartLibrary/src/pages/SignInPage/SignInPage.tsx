import styles from "./signIn.module.css";
import AuthButtonsComponent from "@features/auth/components/auth-component.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setErrorMessage("Невалидни креденцијали. Обидете се повторно.");
                } else {
                    setErrorMessage("Настана грешка. Обидете се повторно.");
                }
                return;
            }

            const user = await response.json();
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
                <input
                    type="email"
                    placeholder="example@edu.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Лозинка</label>
                <input
                    type="password"
                    placeholder="Внесете лозинка"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit">Најави се</button>
            </form>
        </div>
    );
};

export default SignInPage;
