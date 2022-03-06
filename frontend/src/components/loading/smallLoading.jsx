import React from "react";
import styles from "./smallLoading.module.css";

const SmallLoading = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.loader}>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default SmallLoading;
