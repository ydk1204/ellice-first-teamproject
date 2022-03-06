import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signUp.module.css";
import Nav from "../nav/nav.jsx";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [checkedId, setCheckedId] = useState("");
  const [checkedPW, setCheckedPW] = useState("");
  const [checkedDoublePW, setDoublePW] = useState("");
  const [checkedNick, setCheckedNick] = useState("");
  const [checkedEmail, setCheckedEmail] = useState("");

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [userNick, setUserNick] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [passId, setPssId] = useState(false);
  const [passPw, setPassPw] = useState(false);
  const [passCheckPw, setPassCheckPw] = useState(false);
  const [passNick, setPasNick] = useState(false);
  const [passEmail, setPassEmail] = useState(false);

  const [passBtn, setPassBtn] = useState(false);

  const idRef = useRef();
  const pwRef = useRef();
  const checkRef = useRef();
  const nickRef = useRef();
  const emailRef = useRef();

  const handleInput = () => {
    let idValue;
    let pwValue;
    let checkValue;
    let nickValue;
    let emailValue;

    idValue = idRef.current.value;
    pwValue = pwRef.current.value;
    checkValue = checkRef.current.value;
    nickValue = nickRef.current.value;
    emailValue = emailRef.current.value;

    setUserId(idValue);
    setUserPw(pwValue);
    setCheckPw(checkValue);
    setUserNick(nickValue);
    setUserEmail(emailValue);
  };

  useEffect(() => {
    if (!strCheck(userId, "id")) {
      setCheckedId("영문으로 입력해주세요");
      setPssId(false);
    } else {
      setCheckedId("사용가능");
      setPssId(true);
    }
  }, [userId]);

  useEffect(() => {
    if (!strCheck(userPw, "pwd")) {
      setCheckedPW("영문/숫자/특수문자를 포함하여 8~16자로 입력");
      setPassPw(false);
    } else {
      setCheckedPW("사용가능");
      setPassPw(true);
    }
  }, [userPw]);

  useEffect(() => {
    if (userPw !== checkPw || checkPw === "") {
      setDoublePW("동일한 비밀번호를 입력해주세요");
      setPassCheckPw(false);
    } else {
      setDoublePW("비밀번호동일");
      setPassCheckPw(true);
    }
  }, [checkPw]);

  useEffect(() => {
    if (!strCheck(userNick, "nickname")) {
      setCheckedNick("영문으로 입력해주세요");
      setPasNick(false);
    } else {
      setCheckedNick("사용가능");
      setPasNick(true);
    }
  }, [userNick]);

  useEffect(() => {
    if (!strCheck(userEmail, "email")) {
      setCheckedEmail("이메일 형식을 지켜주세요");
      setPassEmail(false);
    } else {
      setCheckedEmail("사용가능");
      setPassEmail(true);
    }
  }, [userEmail]);

  const strCheck = (str, type) => {
    var REGEX = {
      ID: /^[a-z]+[a-z0-9]{4,19}$/g,
      EMAIL: /\S+@\S+\.\S+/,
      PWD_RULE: /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
      NAME_RULE: /^[가-힣a-zA-Z]+$/,
    };

    if (type === "id") {
      return REGEX.ID.test(str);
    } else if (type === "email") {
      return REGEX.EMAIL.test(str);
    } else if (type === "pwd") {
      return REGEX.PWD_RULE.test(str);
    } else if (type === "nickname") {
      return REGEX.ID.test(str);
    } else {
      return false;
    }
  };

  const check = () => {
    register_ok();
  };

  useEffect(() => {
    if (passId && passPw && passCheckPw && passNick && passEmail) {
      setPassBtn(true);
    } else {
      setPassBtn(false);
    }
  }, [passId, passPw, passCheckPw, passNick, passEmail]);

  const register_ok = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      user_id: `${userId}`,
      password: `${userPw}`,
      nickname: `${userNick}`,
      email: `${userEmail}`,
    });

    const url = `${"http://elice-kdt-3rd-team-14.koreacentral.cloudapp.azure.com:5000/register"}`;

    var config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        alert("가입 완료");
        navigate("/login");
      })
      // .then((result) => {
      //   alert("가입 완료");
      //   navigate("/login");
      // })
      .catch(function (error) {
        alert("이미 가입된 회원 정보입니다.");
      });
  };

  return (
    <div className={styles.basicContainer}>
      <Nav></Nav>
      <div className={styles.signbackdrop}>
        <h1 className={styles.loginTitle}>Sign Up</h1>
        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            <p className={styles.inputText}>아이디</p>
            <input
              type="text"
              value={userId}
              ref={idRef}
              onChange={handleInput}
              placeholder="ID를 입력해주세요"
            />
          </div>
          <div className={styles.checkData}>
            {userId.length > 0 && (
              <div className={` ${passId ? styles.nullData : null}`}>
                {checkedId}
              </div>
            )}
          </div>
          <div className={styles.inputBox}>
            <p className={styles.inputText}>비밀번호</p>
            <input
              type="password"
              value={userPw}
              ref={pwRef}
              onChange={handleInput}
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <div className={styles.checkData}>
            {userPw.length > 0 && (
              <div className={` ${passPw ? styles.nullData : null}`}>
                {checkedPW}
              </div>
            )}
          </div>
          <div className={styles.inputBox}>
            <p className={styles.inputText}>비밀번호 확인</p>
            <input
              type="password"
              value={checkPw}
              ref={checkRef}
              onChange={handleInput}
              placeholder="비밀번호 재확인"
            />
          </div>
          <div className={styles.checkData}>
            {checkPw.length > 0 && (
              <div className={` ${passCheckPw ? styles.nullData : null}`}>
                {checkedDoublePW}
              </div>
            )}
          </div>
          <div className={styles.inputBox}>
            <p className={styles.inputText}>닉네임</p>
            <input
              type="text"
              value={userNick}
              ref={nickRef}
              onChange={handleInput}
              placeholder="닉네임을 입력해주세요."
            />
          </div>
          <div className={styles.checkData}>
            {userNick.length > 0 && (
              <div className={` ${passNick ? styles.nullData : null}`}>
                {checkedNick}
              </div>
            )}
          </div>
          <div className={styles.inputBox}>
            <p className={styles.inputText}>이메일</p>
            <input
              type="text"
              value={userEmail}
              ref={emailRef}
              onChange={handleInput}
              placeholder="이메일을 입력해주세요."
            />
          </div>
          <div className={styles.checkData}>
            {userEmail.length > 0 && (
              <div className={` ${passEmail ? styles.nullData : null}`}>
                {checkedEmail}
              </div>
            )}
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button
            className={`${passBtn ? styles.signupBtn : styles.signBtn}`}
            onClick={check}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
