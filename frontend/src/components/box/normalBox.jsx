import React from "react";
import styles from "./box.module.css";
import ActivePie from "../charts/ActivePieChart.jsx";

const NormalBox = (props) => {
  const width = props.width;
  const height = props.height;
  const title = props.title;
  const most = props.most;
  // let color = props.color;
  const backgroundColor = props.backgroundColor;

  const data = 100;

  return (
    <>
      <div className={styles.box} style={{ width, height }}>
        <h4>{title}</h4>
        <div className={styles.line}></div>
        <div className={styles.resultContainer} style={{ backgroundColor }}>
          <p className={styles.boxResult}>{most}</p>
          {/* <ActivePie data={data}></ActivePie> */}
        </div>
      </div>
    </>
  );
};

export default NormalBox;
