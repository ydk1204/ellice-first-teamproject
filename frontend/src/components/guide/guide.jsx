import React from "react";
import styles from "./guide.module.css";
import { useNavigate } from "react-router-dom";

const Guide = () => {
  const navigate = useNavigate();

  const handleSelectPage = (e) => {
    if (sessionStorage.getItem("token")) {
      switch (e.target.value) {
        case "1":
          navigate("/test");
          break;
        case "2":
          navigate("/recommend");
          break;
        default:
          navigate("/stat");
      }
    } else {
      alert("로그인 후 이용이 가능합니다^^.");
      navigate("/login");
    }
  };

  return (
    <>
      <div className={styles.guideContainer}>
        <div className={styles.guides__left}>
          <h1>Which OTT</h1>
          <p className={styles.guide_word}>
            최근 사용량이 증가한 OTT 서비스 <br />
            컨텐츠도 많아지고 OTT 플랫폼도 많아진 지금 <br />
            내가 평소에 좋아하는 컨텐츠가 어떤 플랫폼에 많은지, <br />
            내가 평소에 다른 사람보다 얼마나 OTT 서비스를 이용하는지, <br />
            궁금하다면 지금 바로 아래 버튼을 눌러보세요.
          </p>
          <button
            className={styles.testBtn}
            value={1}
            onClick={handleSelectPage}
          >
            사용등급검사
          </button>
          <button
            className={styles.testBtn}
            value={2}
            onClick={handleSelectPage}
          >
            플랫폼추천
          </button>
          {/* <button
            className={styles.statBtn}
            value={3}
            onClick={handleSelectPage}
          >
            통계
          </button> */}
        </div>
        <div className={styles.guides__right}>
          <img src="/img/ott.png" alt="소개 이미지" className={styles.imgs} />
        </div>
      </div>
    </>
  );
};

export default Guide;
