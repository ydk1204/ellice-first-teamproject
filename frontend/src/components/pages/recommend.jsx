import React, { useContext, useEffect, useRef, useState } from "react";
import Nav from "../nav/nav.jsx";
import Movie from "../movie/movies.jsx";
import Loading from "../loading/loading.jsx";
import PieLoading from "../loading/pieLoading.jsx";
import SmallLoading from "../loading/smallLoading";
import styles from "./recommend.module.css";
import { AuthContext } from "../context/AuthContext.jsx";

const Recommend = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [videoList, setVideoList] = useState(0);
  const [resultBtn, setResultBtn] = useState(false);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const {
    checkedVideo,
    selectedVideoTitle,
    selectedVideoList,
    platformRank,
    clearVideo,
  } = useContext(AuthContext);

  useEffect(() => {
    // setVideoList(selectedVideoTitle.length);
    if (selectedVideoList === 10) {
      setResultBtn(true);
    } else {
      setResultBtn(false);
    }
  }, [selectedVideoList]);

  const handleSelectedVideo = (title) => {
    checkedVideo({
      videoTitle: title,
    });
  };

  const getVideo = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      lastPageId: parseInt(`${pageNumber}`),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const url = `${"http://elice-kdt-3rd-team-14.koreacentral.cloudapp.azure.com:5000/contents"}`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMovies(movies.concat(result.ImageURL));
        setLoading(true);
        setStop(false);
      })
      .catch((error) => {
        console.log("error", error);
        setStop(true);
        setLoading(true);
        setTimeout(() => {
          if (!setStop) {
            getVideo();
            setStop(false);
          }
        }, 5000);
      });
  };

  const pagePlus = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  const pageEnd = useRef();
  let num = 1;

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            num++;
            pagePlus();
            if (num > 84) {
              observer.unobserve(pageEnd.current);
            }
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading, num]);

  useEffect(() => {
    getVideo();
  }, [pageNumber]);

  const result_ok = () => {
    setResponse(true);
    // console.log(typeof selectedVideoTitle);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      titles: selectedVideoTitle,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const url = `${"http://elice-kdt-3rd-team-14.koreacentral.cloudapp.azure.com:5000/recommend"}`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        platformRank({ platform: result });
        clearVideo();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className={styles.viewContainer}>
      <Nav></Nav>
      {response ? <PieLoading /> : null}
      <div className={styles.headerContainer}>
        <h1 className={styles.headerText}>좋아하는 컨텐츠 선택</h1>
        <div>
          <div className={styles.selectOption}>
            <div className={styles.selectedContents}>
              <p className={styles.checkTitle}>선택한 컨텐츠 갯수 :</p>
              <p className={styles.checkCount}>{selectedVideoList}</p>
            </div>
            <button
              className={`${styles.checkBtn} ${
                resultBtn ? null : styles.resultBtn
              }`}
              onClick={result_ok}
            >
              결과 확인
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        movies?.map((movie, index) => {
          return (
            <Movie
              key={index}
              title={movie[0]}
              poster={movie[1]}
              onVideoClick={handleSelectedVideo}
            />
          );
        })
      ) : (
        <PieLoading />
      )}
      <div className={styles.nullBox}></div>
      {loading ? <SmallLoading /> : null}
      {stop ? (
        <div className={styles.stopMessage}>
          {"요청이 너무 많습니다 잠시 후 이용해 주세요!"}
        </div>
      ) : null}
      <div className={styles.scrollContainer}>
        <button className={styles.scrollBtn} ref={pageEnd} onClick={pagePlus}>
          <i className={"fas fa-chevron-down"}></i>
        </button>
      </div>
    </div>
  );
};

export default Recommend;
