import React, { useEffect, useState } from "react";
import styles from "./Curriculum.module.css";
import Experience from "../../components/Experience/Experience";
import { Education } from "../../components";
import CvDownload from "../../components/CvDownload/CvDownload";

const Curriculum = ({}) => {


  return (
    <section className={styles.curriculum}>
      <Experience />
      <Education />
      <CvDownload />
    </section>
  );
};

Curriculum.propTypes = {};

export default Curriculum;
