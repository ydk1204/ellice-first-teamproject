import pandas as pd
import urllib.request
import warnings
warnings.filterwarnings('ignore')


def get_rank(input_genre, input_country):
    # 데이터 다운로드
    urllib.request.urlretrieve("https://raw.githubusercontent.com/seonkyena/ML_ex/master/data/ott_data.csv",
                               filename="ott.csv")
    ott_data = pd.read_csv('ott.csv', encoding='utf-8')

    # 점수를 카운트 하기 위한 장르, 국가, 제공 플랫폼 리스트로 변경
    ott_data['genre'] = ott_data['genre'].apply(
        lambda x: [i for i in str(x).split(' ')])
    ott_data['provider'] = ott_data['provider'].apply(
        lambda x: [i for i in str(x).split(' ')])
    ott_data['country'] = ott_data['country'].apply(
        lambda x: [i for i in str(x).split(' ')])

    # 라프텔의 작품 중 장르에 애니메이션이 표기 되지 않은 작품들에 애니메이션 추가
    for i, j in zip(ott_data['genre'], ott_data['provider']):
        if ('라프텔' in j) and ('애니메이션' not in i):
            i.append('애니메이션')

    # 플랫폼
    platform = ['넷플릭스', '웨이브', '티빙', '쿠팡플레이', '왓챠', '디즈니+', 'seezn', '라프텔']

    genre_score = {}
    for i in input_genre:
        genre_score[i] = input_genre.count(i)

    country_score = {}
    for i in input_country:
        country_score[i] = input_country.count(i)
    best_country = {}
    for key, val in country_score.items():
        if val == max(country_score.values()):
            best_country[key] = val
    best_country = list(best_country.keys())

    # 장르에 따른 포인트 계산 후 데이터 프레임에 추가
    rank_point = []

    for contents_genre in ott_data.genre:
        cnt = 0
        for cg in contents_genre:
            if cg in list(genre_score.keys()):
                cnt += genre_score[cg]
        cnt -= len(contents_genre)
        rank_point.append(cnt)

    for i in range(len(ott_data.country)):
        for cc in ott_data.country.iloc[i]:
            if cc in best_country:
                rank_point[i] += 3

    # 높은 순으로 정렬된 데이터 생성, 최대 포인트-4 이상의 포인트를 가진 컨텐츠만 추출
    ott_data['genre_point'] = rank_point
    ranking = ott_data.sort_values('genre_point', ascending=False)
    ranking = ranking[ranking['genre_point'] >= max(rank_point)//2+2]

    # 가장 많은 컨텐츠를 제공하는 플랫폼 순위
    platform_pop = [x for x in ranking.provider.iloc[:10]]
    platform_list = []
    for i in platform_pop:
        for j in i:
            platform_list.append(j)

    common_rank = {}
    for i in platform:
        common_rank[i] = platform_list.count(i)
    common_rank = sorted(common_rank.items(), key=lambda x: x[1], reverse=True)

    # 가장 많은 독점/오리지널 컨텐츠를 제공하는 플랫폼 순위
    original = []
    for i in ranking.provider.iloc[:10]:
        if len(i) == 1:
            original.append(i[0])

    original_rank = {}
    for i in platform:
        original_rank[i] = original.count(i)
    original_rank = sorted(original_rank.items(),
                           key=lambda x: x[1], reverse=True)

    return common_rank, original_rank
