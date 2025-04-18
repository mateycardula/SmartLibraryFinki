import { FC } from 'react';
import styles from '../styles/home.module.css';
import AuthButtonsComponent from "../components/auth-component.tsx";

const Home: FC = () => {
    return (
        <div className={styles.homeContainer}>
            <h1>📚 Smart Library</h1>
            <p>Моќта на AI во рацете на секој едукатор.</p>

            <div className={styles.authButtons}>
                <AuthButtonsComponent />
            </div>

            <div className={styles.features}>
                <h2>👩‍🏫 Карактеристики:</h2>
                <ul>
                    <li>🚀 Автоматско генерирање на тестови и Q&A</li>
                    <li>🚀 Поддршка за повеќе формати (PDF, DOCX, CSV, TXT)</li>
                    <li>🚀 Кaтегоризација, филтрирање и пребарување</li>
                    <li>🚀 Интуитивен и модерен интерфејс</li>
                    <li>🚀 100% компатибилно со мобилни уреди</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
