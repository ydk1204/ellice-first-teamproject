from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup as bs
import time
import re

#자동 스크롤다운 함수
#https://hyunhp.tistory.com/23 참고
def infinite_loop():
    # 최초 페이지 스크롤 설정
    # 스크롤 시키지 않았을 때의 전체 높이
    last_page_height = driver.execute_script("return document.documentElement.scrollHeight")

    while True:
        try:
            # 윈도우 창을 0에서 위에서 설정한 전체 높이로 이동
            driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")
            time.sleep(1.0)
            # 스크롤 다운한 만큼의 높이를 신규 높이로 설정
            new_page_height = driver.execute_script("return document.documentElement.scrollHeight")
            # 직전 페이지 높이와 신규 페이지 높이 비교
            if new_page_height == last_page_height:
                time.sleep(1.0)
                # 신규 페이지 높이가 이전과 동일하면, while문 break
                if new_page_height == driver.execute_script("return document.documentElement.scrollHeight"):
                    break
            else:
                last_page_height = new_page_height
        except:
            print('==<오류 발생>==')
            break


if __name__ == "__main__":
    chrome_options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    #키노라이츠 탐색 페이지로 이동
    driver.get('https://m.kinolights.com/discover/explore')
    time.sleep(3)

    #정액제만 보기
    newb = driver.find_element(By.XPATH,'// *[ @ id = "listArea"] / div[1] / div / div[2] / span[1] / label')
    newb.click()
    time.sleep(3)

    with open('kinolight_link.txt', 'w', newline='')as f:
        infinite_loop()

        source = driver.page_source
        html = bs(source, 'lxml')

        link=[]
        regex=re.compile('[/title/]+[0-9]+')
        for l in html.select('div.mainContent > div > div> a'):
            li= 'https://m.kinolights.com'+regex.search(str(l)).group()
            link.append(li)

        # txt파일에 쓰기
        f.writelines('\n'.join(link))
        driver.close()