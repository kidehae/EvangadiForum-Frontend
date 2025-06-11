import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <section className={styles.aboutContainer}>
        <Link href="/about">About</Link>
      <h2>Evangadi Networks Q&A</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
        placeat nesciunt? Deserunt perspiciatis laudantium, officiis assumenda
        iusto reprehenderit unde quaerat sunt.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum, quia
        voluptatem reprehenderit omnis, cupiditate delectus eligendi
        exercitationem officiis vitae odit inventore hic..
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio magni ex
        animi nobis explicabo perspiciatis, sequi magnam corrupti atque commodi
        voluptatum veniam earum reprehenderit in.
      </p>
      <button className={styles["about-button"]}>HOW IT WORKS</button>
    </section>
  );
}

export default About;
