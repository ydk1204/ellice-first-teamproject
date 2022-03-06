import React, { useEffect } from "react";
import styles from "./box.module.css";
import ActivePie from "../charts/ActivePieChart.jsx";

const Box = (props) => {
  const width = props.width;
  const height = props.height;
  const title = props.title;
  const backgroundColor = props.backgroundColor;

  const imgW = props.imgWidth;
  const imgH = props.imgHeight;

  let rank = "";

  let img = "";

  const coupang = "/ott/coupang.png";
  const disney = "/ott/disney.png";
  const laftel = "/ott/laftel.png";
  const netflix = "/ott/netflix.png";
  const seezn = "/ott/seezn.png";
  const tving = "/ott/tving.png";
  const watcha = "/ott/watcha.png";
  const wavve = "/ott/wavve.png";

  if (title) {
    switch (title) {
      case "넷플릭스":
        img = netflix;
        break;
      case "웨이브":
        img = wavve;
        break;
      case "왓챠":
        img = watcha;
        break;
      case "티빙":
        img = tving;
        break;
      case "디즈니+":
        img = disney;
        break;
      case "쿠팡플레이":
        img = coupang;
        break;
      case "seezn":
        img = seezn;
        break;
      case "라프텔":
        img = laftel;
        break;
      default:
        img = "";
        break;
    }
  }

  useEffect(() => {
    rank = props.title;
  }, [title]);

  return (
    <>
      <div className={styles.box} style={{ width, height }}>
        <h4>{title}</h4>
        <div className={styles.line}></div>
        <div className={styles.resultContainer} style={{ backgroundColor }}>
          <img
            src={img}
            alt="플랫폼 이미지"
            style={{ width: imgW, height: imgH }}
            className={styles.logoImg}
          />
        </div>
      </div>
    </>
  );
};

export default Box;
