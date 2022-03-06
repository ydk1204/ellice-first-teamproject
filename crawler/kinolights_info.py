from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup as bs
import pandas as pd
import datetime
import time
import re

# https://velog.io/@sangyeon217/deprecation-warning-executablepath-has-been-deprecated 참고
chrome_options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

def data_info(link):
    # 키노라이츠 소개 페이지로 이동
    driver.get(link)
    time.sleep(4)

    # html가져오기
    source = driver.page_source
    html = bs(source, 'lxml')

    #kind
    try:
       kind= str(html.select_one("span.tv-label").text)
    except:
        kind = "movie"

    # title
    title = str(html.select_one('h3.title-kr').text)+'('+str(html.select_one('h4.title-en').text)+')'

    #year
    year=html.select_one('div.movie-header-area > div.movie-title-wrap > p > span:nth-child(2)').text


    g=['액션','SF','판타지','어드벤처(모험)','범죄','스릴러','미스터리','코미디','멜로/로맨스','드라마','서사'
       ,'애니메이션','공포(호러)','예능','다큐멘터리','음악','가족','서스펜스','서부극(웨스턴)','전쟁','뮤지컬',
       '공연','성인']

    #KMRB,runtime,genre,country
    genre=[]
    country=[]
    KMRB=''
    runtime=''
    for i in html.select('li.metadata'):
        st =re.sub('[\n .+]','',i.text).replace('#','')
        if '관람' in st:
            KMRB=st
        elif '분' in st:
            runtime=st.replace('분','')
        elif st in g:
            genre.append(st)
        elif '개봉' in st:
            pass
        else:
            country.append(st)

    #provider
    provider=[]
    for i in html.select('span.cell.provider-name'):
        provider.append(i.text)

    #cast,director
    director=[]
    cast=[]
    for i in html.select('div.person'):
        name=i.select_one('div.name').text
        if i.select_one('div.character').text=='감독':
            director.append(name)
        else:
            cast.append(name)

    #반환
    return [title,year,kind,KMRB,genre,country,cast,director,runtime,provider]


if __name__ == "__main__":

    all_data=pd.DataFrame(columns=['title', 'year','kind','KMRB','genre','country','cast','director','runtime(min)','provider'])

    # txt파일에 담긴 소개 페이지 링크 추출
    with open('../kinolight_link.txt', 'r', encoding='utf-8') as f:
        links=f.readlines()

    #속성 오류로 체크되지 못한 리스트
    late_loading=[]

    print('데이터 총 개수:'+ str(len(links)),'\n')
    print('=====시작=====')

    # info추출
    for link in links:
        try:
            info=data_info(link)
        except AttributeError as ae:
            late_loading.append(link)
            continue
        except Exception as e:
            print(e)
            late_loading+=links[links.index(link):]
            break
        else:
            if info[-1]==[]:#스트리밍 사이트 칸이 비어있을 경우
                late_loading.append(link)
            else:
                all_data.loc[len(all_data)] = info

    #혹시 마지막으로)속성 오류로 체크되지 못한 리스트
    late_loading_2=[]

    #체크되지 않은 리스트 다시 트라이
    if len(late_loading)>0:
        for link in late_loading:
            try:
                info=data_info(link)
            except Exception as e:
                print(e)
                late_loading_2 = late_loading[late_loading.index(link):]
                break
            else:
                all_data.loc[len(all_data)] = info

    # text파일과 csv 파일로 저장
    s = '../dataset/OTT_movie_tvShow_data1_1' + str(datetime.date.today())
    all_data.to_csv(s + '.csv', mode='a+', sep='\t', index=False)
    all_data.to_csv(s + '.txt', mode='a+', sep='\t', index=False)

    # 마지막으로 해봐도 추가 안된 리스트가 있을 경우
    with open('../kinolight_link.txt', 'w+') as f:
        f.writelines(''.join(late_loading_2))

    print('=====완료=====')
    print(all_data)
    print('누락된 데이터:'+str(len(links)-len(all_data)))
    driver.quit()