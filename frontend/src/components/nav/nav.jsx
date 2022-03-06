import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import { AuthContext } from "../context/AuthContext.jsx";

const Nav = () => {
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const onClick = (e) => {
    logout();
  };
  return (
    <div className={styles.navContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbar__logo}>
          <Link to="/main">
            <img className={styles.logo_img} src="/img/logo.png" alt="" />
            <div>Which OTT</div>
          </Link>
        </div>
        <ul className={styles.navbar__menu}>
          <li
            className={`${styles.navbar__menu__item} ${
              user !== null ? styles.logIn : styles.logOut
            }`}
          >
            <Link className={styles.navbarBtn} to="/login">
              로그인
            </Link>
          </li>
          <li
            className={`${styles.navbar__menu__item} ${
              user ? styles.logIn : styles.logOut
            }`}
          >
            <Link className={styles.navbarBtn} to="/signUp">
              회원가입
            </Link>
          </li>
          <li className={`${user !== null ? styles.nickName : styles.logIn}`}>
            {user !== null ? user.replace(/['"]+/g, "") : null}
          </li>
          <li
            className={`${user ? styles.navbar__menu__item : styles.logIn}`}
            onClick={onClick}
          >
            {user !== null ? "로그아웃" : null}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
