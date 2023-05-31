import React from "react";
import img from "./../../assets/meals.jpg";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.mainImage}>
              <img src={img} alt={"meal"} />
      </div>
    </>
  );
};

export default Home;
