import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import Nav from "../nav/nav.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const idRef = useRef();
  const pwRef = useRef();

  const [checkedId, setCheckedId] = useState("");
  const [checkedPW, setCheckedPW] = useState("");

  const [passId, setPssId] = useState(false);
  const [passPw, setPassPw] = useState(false);

  const [passBtn, setPassBtn] = useState(false);

  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthContext);

  const [form, setForm] = useState({
    userId: "",
    userPw: "",
  });

  const onSubmit = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      user_id: `${form.userId}`,
      password: `${form.userPw}`,
    });

    const url = `${"http://elice-kdt-3rd-team-14.koreacentral.cloudapp.azure.com:5000/login"}`;

    var config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
        // `Authorization`: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        handleLogin({
          newToken: JSON.stringify(response.data.access_token),
          nickname: JSON.stringify(response.data.nickname),
        });
      })
      .catch(function (error) {
        alert("정확하게 입력해주세요.");
      });
  };

  const handleInput = (e) => {
    let idValue;
    let pwValue;

    idValue = idRef.current.value;
    pwValue = pwRef.current.value;

    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setUserId(e.target.value);
    setUserPw(e.target.value);
  };

  const onClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (!strCheck(form.userId, "id")) {
      setCheckedId("아이디를 정확하게 입력해주세요");
      setPssId(false);
    } else {
      setCheckedId("사용가능");
      setPssId(true);
    }
  }, [userId]);

  useEffect(() => {
    if (!strCheck(form.userPw, "pwd")) {
      setCheckedPW("영문/숫자/특수문자를 포함하여 8~16자로 입력");
      setPassPw(false);
    } else {
      setCheckedPW("사용가능");
      setPassPw(true);
    }
  }, [userPw]);

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

  useEffect(() => {
    if (passId && passPw) {
      setPassBtn(true);
    } else {
      setPassBtn(false);
    }
  }, [passId, passPw]);

  const check = () => {
    if (form.userId && form.userId) {
      onSubmit();
    }
  };

  return (
    <div className={styles.basicContainer}>
      <Nav></Nav>
      <div className={styles.backdrop}>
        <h1 className={styles.loginTitle}>Welcome!</h1>
        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            <p className={styles.inputText}>아이디</p>
            <input
              type="text"
              value={form.userId}
              name="userId"
              ref={idRef}
              onChange={handleInput}
              placeholder=" ID를 입력해주세요"
            />
          </div>
          <div className={styles.checkData}>
            {form.userId.length > 0 && (
              <div className={` ${passId ? styles.nullData : null}`}>
                {checkedId}
              </div>
            )}
          </div>
          <div className={styles.inputBox}>
            <p className={styles.inputText}>비밀번호</p>
            <input
              type="password"
              value={form.userPw}
              name="userPw"
              ref={pwRef}
              onChange={handleInput}
              placeholder=" 비밀번호를 입력해주세요."
            />
          </div>
          <div className={styles.checkData}>
            {form.userPw.length > 0 && (
              <div className={`${passPw ? styles.nullData : null}`}>
                {checkedPW}
              </div>
            )}
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button
            className={`${passBtn ? styles.btn : styles.sealBtn}`}
            onClick={check}
          >
            로그인
          </button>
          <button className={styles.btn} onClick={onClick}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
