import styles from "./signUp.module.css";
import AuthButtonsComponent from "@features/auth/components/auth-component.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        const newUser = {
            fullName: name,
            email,
            password,
        };

        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                navigate("/sign-in");
            } else if (response.status === 409) {
                setErrorMessage("Корисник со оваа емаил адреса веќе постои.");
            } else {
                setErrorMessage("Неуспешна регистрација. Обидете се повторно.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Настана грешка при регистрација.");
        }
    };

    return (
        <div className={styles.authContainer}>
            <AuthButtonsComponent activeTab="sign-up" />
            <form onSubmit={handleSubmit}>
                <label>Име и презиме</label>
                <input
                    type="text"
                    placeholder="Јован Јованов"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                    placeholder="Креирај лозинка"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                <button type="submit">Регистрирај се</button>
            </form>
        </div>
    );
};

export default SignUpPage;
