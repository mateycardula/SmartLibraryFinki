import React from "react";
import styles from "./home.module.css";
import AuthButtonsComponent from "@features/auth/components/auth-component.js";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <h1>📚 Smart Library</h1>
      <p>Моќта на AI во рацете на секој едукатор.</p>
      <div className={styles.authButtons}>
        <AuthButtonsComponent />
      </div>
    </section>
  );
};

export default HeroSection;
