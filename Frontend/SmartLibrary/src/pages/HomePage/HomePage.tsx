import React from "react";
import styles from "./home.module.css";
import HeroSection from "./HeroSection";
import FeaturesList from "./FeaturesList";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <HeroSection />
      <FeaturesList />
    </div>
  );
};

export default HomePage;
