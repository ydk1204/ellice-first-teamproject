import React, { useCallback, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [userClass, setUserClass] = useState({});
  const [userAge, setUserAge] = useState("");
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState("");

  const navigate = useNavigate();

  const [selectedVideoTitle, setSelectedVideoTitle] = useState([]);
  const [selectedVideoList, setSelectedVideoList] = useState(0);

  const [common, setCommon] = useState([]);
  const [original, setOriginal] = useState([]);

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("nickname");
    setUser(null);
    setLoading(false);
    navigate("/");
  }, []);

  const loadUser = () => {
    setUser(sessionStorage.getItem("nickname"));
    setLoading(false);
    navigate("/");
  };

  const handleLogin = ({ newToken, nickname }) => {
    if (!newToken) {
      console.error("no new token");
    }
    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("nickname", nickname);
    loadUser();
  };

  const handleUserClass = ({ classTest, userAge, userName, userGender }) => {
    if (!classTest) {
      console.log("new classTest");
    }
    setUserClass(classTest);
    setUserAge(userAge);
    setUserName(userName);
    setUserGender(userGender);
    userClass && navigate("/result");
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) loadUser();
    else {
      logout();
    }
  }, []);

  const selectList = ({ videoList }) => {
    setSelectedVideoList(videoList);
  };

  const checkedVideo = ({ videoTitle }) => {
    const setTitle = selectedVideoTitle.concat(videoTitle);
    setSelectedVideoTitle(setTitle);
  };

  const removeVideo = ({ videoTitle }) => {
    let index = selectedVideoTitle.indexOf(videoTitle);
    const setTitle = selectedVideoTitle;
    if (index > -1) {
      setTitle.splice(index, 1);
    }
    setSelectedVideoTitle(setTitle);
  };

  const clearVideo = () => {
    setSelectedVideoTitle([]);
  };

  const platformRank = ({ platform }) => {
    platform && setCommon(platform.common_rank);
    platform && setOriginal(platform.original_rank);
    navigate("/stat");
  };

  const store = {
    user,
    loading,
    userClass,
    userAge,
    userName,
    userGender,
    selectedVideoTitle,
    selectedVideoList,
    common,
    original,
    handleLogin,
    logout,
    setUser,
    handleUserClass,
    checkedVideo,
    removeVideo,
    selectList,
    platformRank,
    clearVideo,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
