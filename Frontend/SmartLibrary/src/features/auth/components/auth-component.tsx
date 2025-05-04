import { Link } from "react-router-dom";
import styles from "@styles/auth.module.css";
import * as React from "react";

interface AuthToggleProps {
  activeTab?: "sign-in" | "sign-up";
}

const AuthButtonsComponent: React.FC<AuthToggleProps> = ({ activeTab }) => {
  return (
    <div className={styles["toggle-buttons"]}>
      <Link to="/sign-in">
        <button className={activeTab === "sign-in" ? styles.active : ""}>
          🔐 Најава
        </button>
      </Link>
      <Link to="/sign-up">
        <button className={activeTab === "sign-up" ? styles.active : ""}>
          📝 Регистрација
        </button>
      </Link>
    </div>
  );
};

export default AuthButtonsComponent;
