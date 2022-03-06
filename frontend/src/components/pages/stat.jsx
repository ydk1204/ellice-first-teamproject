import React, { useContext } from "react";
import MixBar from "../charts/MixBarChart.jsx";
import DoubleBar from "../charts/DoubleBarChart.jsx";
import CustomPie from "../charts/CustomPieChart.jsx";
import Nav from "../nav/nav.jsx";
import Box from "../box/box.jsx";
import styles from "./stat.module.css";
import { AuthContext } from "../context/AuthContext.jsx";

const Stat = () => {
  const { common, original } = useContext(AuthContext);

  return (
    <>
      <Nav></Nav>
      <h1 className={styles.statTitle}>OTT 플랫폼 추천</h1>
      <div className={styles.containerSet}>
        <div className={styles.suggestionBox}>
          <h3 className={styles.boxName}>
            선호 컨텐츠와 유사한 장르 컨텐츠가 많은 플랫폼
          </h3>
          {common ? (
            <div className={styles.suggestionContainer}>
              <Box
                width={350}
                height={350}
                title={common[0][0]}
                imgWidth={300}
                imgHeight={240}
                backgroundColor={`#ffab91`}
              ></Box>
              <Box
                width={300}
                height={300}
                title={common[1][0]}
                imgWidth={230}
                imgHeight={210}
                backgroundColor={`#c5e1a5`}
              ></Box>
              <Box
                width={250}
                height={250}
                title={common[2][0]}
                imgWidth={185}
                imgHeight={165}
                backgroundColor={`#fff9c4`}
              ></Box>
            </div>
          ) : null}
        </div>

        <div className={styles.suggestionBox}>
          <h3 className={styles.boxName}>
            선호 컨텐츠와 유사한 독점 컨텐츠가 많은 플랫폼
          </h3>
          {original ? (
            <div className={styles.suggestionContainer}>
              <Box
                width={350}
                height={350}
                title={original[0][0]}
                imgWidth={300}
                imgHeight={240}
                backgroundColor={`#ffab91`}
              ></Box>
              <Box
                width={300}
                height={300}
                title={original[1][0]}
                imgWidth={230}
                imgHeight={210}
                backgroundColor={`#c5e1a5`}
              ></Box>
              <Box
                width={250}
                height={250}
                title={original[2][0]}
                imgWidth={185}
                imgHeight={165}
                backgroundColor={`#fff9c4`}
              ></Box>
            </div>
          ) : null}
        </div>

        <h1 className={styles.statTitle}>OTT 통계</h1>
        <div className={styles.genderContainer}>
          <div className={styles.genderStat}>
            <div className={styles.pieChart}>
              <p className={styles.pieTitle}>OTT 독점/오리지널 컨텐츠</p>
              <div className={styles.line}></div>
              <DoubleBar></DoubleBar>
            </div>
          </div>
        </div>
        <div className={styles.ageStat}>
          <p className={styles.pieTitle}>2008년 이전 컨텐츠 비율</p>
          <div className={styles.line}></div>
          <CustomPie></CustomPie>
        </div>
        <div className={styles.ageStat}>
          <p className={styles.pieTitle}>TV 프로그램 종류</p>
          <div className={styles.line}></div>
          <MixBar></MixBar>
        </div>
      </div>
      <div className={styles.totalContainer}></div>
    </>
  );
};

export default Stat;
