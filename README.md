<h1 align="center">
  <img width="300" src="https://raw.githubusercontent.com/world970511/elice_OTT/master/doc/img_etc/%EA%B7%B8%EB%A6%BC1_1.jpg">
</h1>

<h3 align="center">앨리스 AI 트랙 -OTT 서비스 프로젝트: Which OTT</h3>

<p align="center">
  📰
  <a href="#서비스 소개">서비스 소개</a> • 
  <a href="#팀원">팀원</a> • 
  <a href="#데이터셋">데이터셋</a> • 
  <a href="#기술 스택">기술 스택</a> •
  <a href="#기능">기능</a> •
  <a href="#스토리보드">스토리보드</a> 
</p>
</br>

## 💁서비스 소개
**'적은 시간으로 사용자에게 알맞은 OTT 서비스를 추천한다"**
<br />
<details>
  <summary>타겟층</summary>
  <div markdown="1">
    <ul>
      <li>OTT 서비스 선택에 어려움을 겪고 있는 사람들, 다수의 서비스를 이용하는 것에 대해 부담을 느끼는 사람들</li>
    </ul>
  </div>
</details>
<details>
  <summary>문제 정의</summary>
  <div markdown="1">
    <ul>
      <li>코로나 이후 ott 서비스 변화 분석 : <a href="https://github.com/world970511/elice_OTT/blob/master/eda/OTT_covid_EDA.ipynb">미디어통계포털 미디어 이용행태 조사(OTT)</a></li>
      <li>코로나 이후 ott 서비스 이용량이 급증함과 동시에 여러 서비스들이 런칭함에 따라 
      다수의 서비스 중 자신에게 맞는 서비스를 선택하는데 어려움을 겪거나 다수의 서비스를 구독하는 것에 대해 부담을 느끼는 사람들이 늘어나고 있다.</li>
    </ul>
  </div>
</details>
<details>
  <summary>가설 설정 방법</summary>
  <div markdown="1">
    <ul>
      <li>각 OTT서비스가 보유한 콘텐츠의 장르/국가/관람가 등의 데이터와 플랫폼의 오리지널/독점 콘텐츠 보유 비중을 시각화하면 각 서비스의 콘텐츠 특성을 파악할 수 있다</li>
      <li>분석으로 발견한 특성을 바탕으로 콘텐츠 기반 추천(CBF) 모델 적용 시 사용자가 원하는 콘텐츠를 많이 보유한 서비스를 추천받을 수 있을 것이다.</li>
      <li>사용자의 OTT 서비스 이용 시간/빈도 데이터를 바탕으로 사용자가 어느 정도로 OTT를 사용하고 있는지 파악할 수 있도록 돕고 이를 바탕으로 OTT 서비스 추천에 대해 홍보한다면, 서비스에 대한 흥미를 높일 수 있다.</li>
    </ul>
  </div>
</details>
<details>
  <summary>기대 효과</summary>
  <div markdown="1">
    <ul>
      <li>타겟층의 트래픽 유도를 통해 광고 수익을 창출할 수 있다. 더 나아가, OTT 서비스 별 강점 및 단점을 분석하는 서비스를 제공하여 솔루션을 제공하는 역할을 할 수 있다   </li>
    </ul>
  </div>
</details>
<br />


## 👥팀원
|  이름  |   역할    |                                                                                        개발 내용                                                                                        |
| :----: | :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 김선교|  팀장/데이터 분석  |   데이터 수집 및 전처리<br /> 추천 모델 개발|
| 박나은 | 데이터 분석|          키노라이츠 데이터 크롤링 및 전처리<br />기획서 및 문서 작성  |
| 최성호 |   Back-end  |         DB설계<br />웹 서비스 배포
| 양덕규 |   Front-end      |  메인 페이지 개발<br /> 추천 페이지 개발<br/>통계 페이지 개발<br/>소개 페이지 개발                                         |
<br />


## 📊데이터셋
- 미디어통계포털(https://stat.kisdi.re.kr/kor/tblInfo/TblInfoListResult.html?vw_cd=MT_ATITLE&siteGb=SITE001&up_list_id=004_001_006)
- 넷플릭스 데이터(https://www.kaggle.com/akashguna/netflix-prize-shows-information)
- 디즈니 데이터(https://www.kaggle.com/unanimad/disney-plus-show)
- 키노라이츠 크롤링 데이터

<details>
  <summary>인사이트</summary>
  <div markdown="1">
    <ul>
      <li>각 플랫폼별 콘텐츠 특징 및 장단점</li>
      <li>OTT서비스 이용도 및 관심도</li>
    </ul>
  </div>
</details>
<details>
  <summary>예상되는 어려움</summary>
  <div markdown="1">
    <ul>
      <li>크롤링 시 알 수 없는 오류로 데이터 수집이 늦어질 수 있음</li>
      <li>데이터에 부족 및 탐색 오류로 편향되거나 잘못된 분석을 하는 것</li>
      <li>플랫폼별 콘텐츠 특징을 찾을 수 없거나 그 차이가 크지 않은 경우</li>
    </ul>
  </div>
</details>
</br>


## ⚒️기술 스택

### Front-end   
|<img src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" width="50px" height="50px" />|<img src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" width="50px" height="50px" />|  <img src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" width="50px" height="50px" />| <img src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" width="50px" height="50px" />| <img src="https://raw.githubusercontent.com/world970511/elice_OTT/master/doc/img_etc/rechart.png" width="60px" height="50px" />|
| :-----------------------------------------------------------: | :-----------------------------------------------------------: | :-----------------------------------------------------------: | :-----------------------------------------------------------: | :-----------------------------------------------------------: |
|HTML5|CSS3|JavaScript|React|Recharts|

### Back-end

|<img src="https://profilinator.rishav.dev/skills-assets/python-original.svg" alt="Python" width="50px" height="50px" />|<img src="https://profilinator.rishav.dev/skills-assets/flask.png" alt="Flask" width="50px" height="50px"/> |<img src="https://profilinator.rishav.dev/skills-assets/mariadb.png" alt="Maria DB" width="50px" height="50px"/>|
| :-----------------------------------------------------------: | :-----------------------------------------------------------: | :-----------------------------------------------------------: |
| Python | Flask | MariaDB |

### 데이터분석
|<img src="https://raw.githubusercontent.com/world970511/elice_OTT/master/doc/img_etc/800px-Pandas_logo.svg.png" width="90px" height="50px">|<img src="https://raw.githubusercontent.com/world970511/elice_OTT/master/doc/img_etc/1200px-NumPy_logo_2020.svg.png" width="80px" height="50px">|<img src="https://raw.githubusercontent.com/world970511/elice_OTT/master/doc/img_etc/logo-plotly.svg" width="50px" height="50px">|<img src="https://raw.githubusercontent.com/world970511/elice_OTT/master/doc/img_etc/colab.png" width="50px" height="50px">|
| :-----------------------------------------------------------: | :-----------------------------------------------------------: | :-----------------------------------------------------------: | :-----------------------------------------------------------: |
|Pandas|Numpy|Plotly|Colab|

### 버전 관리

| <img src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" alt="Git" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/gitlab.svg" alt="GitLab" width="50px" height="50px" /> |
| :---------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
|                                                        Git                                                        |                                                     GitLab                                                     |

<div id="3"></div></br>


## 🤖기능

### 메인 기능

|  기능  |                                                                                        내용                                                                                       |
| :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| OTT 추천 서비스 | 사용자의 콘텐츠 성향 검사 후 사용자에게 알맞은 OTT 서비스 추천|


### 서브 기능

|  기능  |                                                                                        내용                                                                                       |
| :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| OTT 관련 통계 제공 | 각 OTT서비스 분석을 통한 콘텐츠 통계 자료를 제공|
| OTT 사용 등급 검사 | 본인의 OTT 사용 빈도와 시간을 통해 OTT서비스 이용도 파악을 돕는 기능 |

### 웹 서비스의 사용자가 데이터 분석 시각화 자료를 통해 얻는 인사이트
- 본인의 OTT 서비스 이용도 확인
- OTT별 장단점 및 콘텐츠 특성 확인
- 사용자 취향에 따른 플랫폼 추천
</br>


## 📂구성도/기획서/발표자료
- 구성도🔗 https://www.figma.com/file/od7rNoPL0p5R8W83ntgGSF/WhichOTT?node-id=0%3A1
- <a href="https://github.com/world970511/elice_OTT/blob/master/doc/Which_OTT_%EA%B8%B0%ED%9A%8D%EC%84%9C.pdf">기획서</a>
- <a href="https://github.com/world970511/elice_OTT/blob/master/doc/OTT%EC%84%9C%EB%B9%84%EC%8A%A4_14%ED%8C%80_%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C.pdf">발표자료</a>

