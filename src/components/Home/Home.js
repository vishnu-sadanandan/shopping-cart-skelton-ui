import React from "react";
import img from "./../../assets/meals.jpg";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section>
      <div className={styles.mainImage}>
          <img src={img} alt={"meal"} />
      </div>
      <div className={styles.summary}>
        <h2>Delicious Food, Delivered To You</h2>
        <p>
          Choose your favorite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <p>
          All our meals are cooked with high-quality ingredients, just-in-time and
          of course by experienced chefs!
        </p>
    </div>
    </section>
  );
};

export default Home;
