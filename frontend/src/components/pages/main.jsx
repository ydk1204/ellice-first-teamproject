import React, { useEffect, useState } from "react";
import styles from "./main.module.css";
import Nav from "../nav/nav.jsx";
import Guide from "../guide/guide.jsx";
import Line from "../charts/lineChart.jsx";
import ActivePie from "../charts/ActivePieChart.jsx";
import ThirdBar from "../charts/ThirdBarChart.jsx";
import experience from "../../PlatformStat/ott_experience.json";
import frequency from "../../PlatformStat/ott_frequency.json";

const Main = () => {
  const [expData, setExpData] = useState([]);
  const [freqData, setFreqData] = useState([]);

  useEffect(() => {
    for (let key in experience) {
      setExpData((expData) => [...expData, experience[key].count]);
    }
    for (let key in frequency) {
      setFreqData((freqData) => [...freqData, frequency[key].count]);
    }
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Nav></Nav>
      <Guide></Guide>
      <div className={styles.graph}>
        <h3 className={styles.mainGraphTitle}>코로나 전후 OTT 사용량 변화</h3>
        <h4 className={styles.subTitle}>년도별 OTT 이용 경험</h4>
        <div className={styles.pieContainer}>
          <div className={styles.pieChart}>
            <h5 className={styles.pieTitle}>2019년</h5>
            <ActivePie noExp={expData[0]} yesExp={expData[1]}></ActivePie>
          </div>
          <div className={styles.pieChart}>
            <h5 className={styles.pieTitle}>2020년</h5>
            <ActivePie noExp={expData[2]} yesExp={expData[3]}></ActivePie>
          </div>
          <div className={styles.pieChart}>
            <h5 className={styles.pieTitle}>2021년</h5>
            <ActivePie noExp={expData[4]} yesExp={expData[5]}></ActivePie>
          </div>
        </div>
        <h4 className={styles.subTitle}>년도별 OTT 이용 빈도</h4>
        <div className={styles.lineContainer}>
          <ThirdBar data={freqData}></ThirdBar>
        </div>
      </div>
    </div>
  );
};

export default Main;
