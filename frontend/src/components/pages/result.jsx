import React, { useEffect, useState, useContext } from "react";
import Pie from "../charts/pieChart";
import Bar from "../charts/barChart";
import BarPlus from "../charts/barChartPlus";
import PiePlus from "../charts/pieChartPlus";
import NormalBox from "../box/normalBox.jsx";
import Nav from "../nav/nav.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./result.module.css";
import { AuthContext } from "../context/AuthContext.jsx";

const Result = () => {
  const { userAge, userName, userGender } = useContext(AuthContext);
  const navigate = useNavigate();

  const [checkTest, setCheckTest] = useState(false);
  const [ageTest, setAgeTest] = useState(false);
  const [genderTest, setGenderTest] = useState(false);

  const [useStat, setUseStat] = useState({});
  const [useAge, setUseAge] = useState("");

  const { userClass } = useContext(AuthContext);

  const [mainWord, setMainWord] = useState("");
  const [subWord, setSubWord] = useState("");

  const [manTime, setManTime] = useState([]);
  const [womanTime, setWomanTime] = useState([]);
  const [manCycle, setManCycle] = useState([]);
  const [womanCycle, setWomanCycle] = useState([]);

  const [ageTime, setAgeTime] = useState([]);
  const [ageCycle, setAgeCycle] = useState([]);

  const [renderAge, setRenderAge] = useState(0);

  const raking_word = {
    1: `OTT is my life..`,
    2: `우리 너무 자주봐요`,
    3: `우리 앞으로 좀 자주봐요`,
    4: `처음 뵙겠습니다!`,
    5: `지긋지긋한 인간! 당신은 심각한 OTT 중독자입니다!`,
    6: `우리 이젠 덜 봐도 될 것 같아요.....`,
    7: `우리 친해져서 깐부하지 않을래요?`,
    8: `OTT를 거의 사용하지 않고 있어요.. OTT 추천 받기를 권장드립니다!`,
  };

  const age = {
    9: 10,
    19: 20,
    29: 30,
    39: 40,
    49: 50,
    59: 60,
    69: 70,
    79: 999,
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const url = `${"http://elice-kdt-3rd-team-14.koreacentral.cloudapp.azure.com:5000/usage_statistics"}`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => setUseStat(result))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    for (let key in age) {
      if (key === String(userAge)) {
        setUseAge(age[key]);
      }
    }
  }, []);

  useEffect(() => {
    useAge > 71 ? setRenderAge(71) : setRenderAge(useAge);
    const gender = userGender === "man" ? true : false;
    setGenderTest(gender);
  }, [useAge, userGender]);

  useEffect(() => {
    for (let val in useStat.usage_time_data_list) {
      if (useStat.usage_time_data_list[val][0] === String(useAge)) {
        setAgeTime(useStat.usage_time_data_list[val]);
      }
    }

    for (let val in useStat.frequency_of_use_data_list) {
      if (useStat.frequency_of_use_data_list[val][0] === String(useAge)) {
        setAgeCycle(useStat.frequency_of_use_data_list[val]);
      }
    }
  }, [useStat]);

  useEffect(() => {
    for (let val in useStat.usage_time_data_list) {
      if (useStat.usage_time_data_list[val][0] === "man") {
        setManTime(useStat.usage_time_data_list[val]);
      }
      if (useStat.usage_time_data_list[val][0] === "woman") {
        setWomanTime(useStat.usage_time_data_list[val]);
      }
    }

    for (let val in useStat.frequency_of_use_data_list) {
      if (useStat.frequency_of_use_data_list[val][0] === "man") {
        setManCycle(useStat.frequency_of_use_data_list[val]);
      }
      if (useStat.frequency_of_use_data_list[val][0] === "woman") {
        setWomanCycle(useStat.frequency_of_use_data_list[val]);
      }
    }
  }, [useStat]);

  useEffect(() => {
    for (let key in raking_word) {
      if (parseInt(key) === userClass.rank_class) {
        setMainWord(raking_word[key]);
      }
      if (parseInt(key) === userClass.rank_class + 4) {
        setSubWord(raking_word[key]);
      }
    }
  }, [userClass]);

  return (
    <>
      <Nav></Nav>
      <div className={styles.resultContainer}>
        <h1 className={styles.resultTitle}>OTT 사용 등급 결과</h1>
        <div className={styles.totalContainer}>
          <div>
            <h4 className={styles.intro}>{mainWord}</h4>
            <h4 className={styles.detail}>{subWord}</h4>
            <div className={styles.line}></div>
          </div>
          <div className={styles.boxContainer}>
            <NormalBox
              width={350}
              height={150}
              title={"등급 %"}
              most={Math.round(userClass.rank_percent)}
              backgroundColor={`#80deea`}
            ></NormalBox>
            <NormalBox
              width={350}
              height={150}
              title={"등급 순위"}
              most={userClass.rank_class}
              backgroundColor={`#ffab91`}
            ></NormalBox>
          </div>
        </div>
        {/* 성별에 따른 차트 */}
        <div className={styles.totalContainer}>
          <div>
            <h4 className={styles.detail}>
              {`${userName}님의 성별과 비슷한 이용자의 평균 결과는 다음과 같습니다.`}
            </h4>
            <div className={styles.line}></div>
          </div>
          <div className={styles.boxContainer}>
            <div
              className={`${styles.genderContainer} ${
                checkTest ? styles.rightMove : styles.leftMove
              }`}
            >
              <h4 className={styles.statTitle}>OTT 서비스 이용 시간</h4>
              <div className={styles.genderStat}>
                <div className={styles.pieChart}>
                  <p
                    className={`${styles.pieTitle} ${
                      genderTest ? styles.genderCheck : null
                    }`}
                  >
                    남성
                  </p>
                  <div className={styles.detailLine}></div>
                  <Pie w={400} h={350} data={manTime} color={`#c5e1a5`}></Pie>
                </div>
                <div className={styles.pieChart}>
                  <p
                    className={`${styles.pieTitle} ${
                      genderTest ? null : styles.genderCheck
                    }`}
                  >
                    여성
                  </p>
                  <div className={styles.detailLine}></div>
                  <Pie w={400} h={350} data={womanTime} color={`#ffcdd2`}></Pie>
                </div>
              </div>
            </div>
            <div
              className={`${styles.genderContainer} ${
                checkTest ? styles.rightMove : styles.leftMove
              }`}
            >
              <h4 className={styles.statTitle}>OTT 서비스 이용 빈도</h4>
              <div className={styles.genderStat}>
                <div className={styles.pieChart}>
                  <p
                    className={`${styles.pieTitle} ${
                      genderTest ? styles.genderCheck : null
                    }`}
                  >
                    남성
                  </p>
                  <div className={styles.detailLine}></div>
                  <PiePlus
                    w={400}
                    h={400}
                    data={manCycle}
                    color={`#c5e1a5`}
                  ></PiePlus>
                </div>
                <div className={styles.pieChart}>
                  <p
                    className={`${styles.pieTitle} ${
                      genderTest ? null : styles.genderCheck
                    }`}
                  >
                    여성
                  </p>
                  <div className={styles.detailLine}></div>
                  <PiePlus
                    w={400}
                    h={400}
                    data={womanCycle}
                    color={`#ffcdd2`}
                  ></PiePlus>
                </div>
              </div>
            </div>
            <button
              className={styles.prevBtn}
              onClick={() => {
                setCheckTest(false);
              }}
            >
              <i
                className={`${`fas fa-chevron-left`} ${
                  checkTest ? null : styles.grayBtn
                }`}
              ></i>
            </button>
            <button
              className={styles.nextBtn}
              onClick={() => {
                setCheckTest(true);
              }}
            >
              <i
                className={`${`fas fa-chevron-right`} ${
                  checkTest ? styles.grayBtn : null
                }`}
              ></i>
            </button>
          </div>
        </div>
        {/* 연령별 차트 */}
        <div className={styles.totalContainer}>
          <div>
            <h4 className={styles.detail}>
              {`${userName}님의 연령과 비슷한 이용자의 평균 결과는 다음과 같습니다.`}
            </h4>
            <div className={styles.line}></div>
          </div>
          <div className={styles.boxContainer}>
            <div
              className={`${styles.ageContainer} ${
                ageTest ? styles.age_rightMove : styles.age_leftMove
              }`}
            >
              <h4 className={styles.statTitle}>OTT 서비스 이용 시간</h4>
              <div className={styles.ageStat}>
                <div className={styles.pieChart}>
                  <p className={styles.ageTitle}>
                    {renderAge > 70 ? "70대 이상" : `${renderAge} 대`}
                  </p>
                  <div className={styles.detailLine}></div>
                  <Bar w={750} h={400} age={ageTime}></Bar>
                </div>
              </div>
            </div>
            <div
              className={`${styles.genderContainer} ${
                ageTest ? styles.age_rightMove : styles.age_leftMove
              }`}
            >
              <h4 className={styles.statTitle}>OTT 서비스 이용 빈도</h4>
              <div className={styles.ageStat}>
                <div className={styles.pieChart}>
                  <p className={styles.ageTitle}>
                    {renderAge > 70 ? "70대 이상" : `${renderAge} 대`}
                  </p>
                  <div className={styles.detailLine}></div>
                  <BarPlus w={750} h={400} age={ageCycle}></BarPlus>
                </div>
              </div>
            </div>
            <button
              className={styles.prevBtn}
              onClick={() => {
                setAgeTest(false);
              }}
            >
              <i
                className={`${`fas fa-chevron-left`} ${
                  ageTest ? null : styles.grayBtn
                }`}
              ></i>
            </button>
            <button
              className={styles.nextBtn}
              onClick={() => {
                setAgeTest(true);
              }}
            >
              <i
                className={`${`fas fa-chevron-right`} ${
                  ageTest ? styles.grayBtn : null
                }`}
              ></i>
            </button>
          </div>
        </div>
        <h1 className={styles.resultTitle}>
          {`${userName}님에게 어울리는 플랫폼을 찾아보세요.`}{" "}
        </h1>
        <div className={styles.totalContainer}>
          <div>
            <h4
              className={styles.intro}
            >{`자신과 맞는 플랫폼을 찾고 싶다면?`}</h4>
            <h4 className={styles.detail}>{`아래 버튼을 눌러주세요`}</h4>
            <div className={styles.line}></div>
          </div>

          <button
            className={`${styles.btn}`}
            onClick={() => {
              navigate("/recommend");
            }}
          >
            테스트
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
