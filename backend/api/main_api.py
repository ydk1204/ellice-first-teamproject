import json

from flask import (
    Blueprint,
    request,
    Response
)
from flask_jwt_extended import create_access_token
from werkzeug.security import (
    generate_password_hash,
    check_password_hash,
)

from app import db
# Todo: column_list 삭제
from models.models import (
    User,
    OttUsageTime_statistics,
    OttFrequencyOfUse_statistics,
    OttVideoList,
    usage_time_column_list,
    frequency_of_use_column_list,
)
from api.analysis.ott_ranking import get_rank

'''
main_api.py
이 파일은 클라이언트와 통신하는 api를 작성하는 파일입니다.
'''


bp = Blueprint('main', __name__, url_prefix='/')
resp = Response()

# 테스트중 cors 문제를 해결하기 위한 임시조치
resp.headers['Access-Control-Allow-Origin'] = '*'


@bp.route('/register', methods=('POST',))
def register():
    if request.method == 'POST':
        request_data = request.get_json()

        for key in ['user_id', 'password', 'nickname', 'email']:
            if key not in request_data:
                resp.status_code = 400
                resp.set_data(json.dumps({'result': "Input Validation Error"}))
                return resp

        user = User.query.filter_by(
            id=request_data['user_id']).first()

        if user is None:
            password = generate_password_hash(request_data['password'])

            user = User(id=request_data['user_id'], password=password,
                        nickname=request_data['nickname'], email=request_data['email'])

            db.session.add(user)
            db.session.commit()
            db.session.close()

            resp.status_code = 200
            return resp
        else:
            resp.status_code = 400
            resp.set_data(json.dumps({'result': "ID is already registered"}))
            return resp


@bp.route('/login', methods=('POST',))
def login():
    if request.method == 'POST':
        request_data = request.get_json()

        for key in ['user_id', 'password']:
            if key not in request_data:
                resp.status_code = 400
                resp.set_data(json.dumps({'result': "Input Validation Error"}))
                return resp

        id = request_data['user_id']
        password = request_data['password']

        user_data = User.query.filter_by(id=id).first()
        db.session.close()

        if user_data is None:
            resp.status_code = 400
            resp.set_data(json.dumps({'result': "ID does not exist"}))
            return resp
        elif check_password_hash(user_data.password, password) is False:
            resp.status_code = 400
            resp.set_data(json.dumps({'result': "Password is wrong"}))
            return resp
        else:
            resp.status_code = 200
            resp.set_data(json.dumps({
                'nickname': user_data.nickname,
                'access_token': create_access_token(id)
            }))
            return resp


@bp.route('/usage_survey', methods=('POST',))
def usage_survey():
    if request.method == 'POST':
        request_data = request.get_json()

        for key in ['age', 'usage_time', 'frequency_of_use']:
            if key not in request_data:
                resp.status_code = 400
                resp.set_data(json.dumps({'result': "Input Validation Error"}))
                return resp

        age = request_data['age']
        usage_time = request_data['usage_time']
        frequency_of_use = request_data['frequency_of_use']

        if 0 < age < 10:
            id = 10
        elif age < 20:
            id = 20
        elif age < 30:
            id = 30
        elif age < 40:
            id = 40
        elif age < 50:
            id = 50
        elif age < 60:
            id = 60
        elif age < 70:
            id = 70
        elif age >= 70:
            id = 999

        usage_time_data = OttUsageTime_statistics.query.filter_by(
            id=id).first()

        fields = [0 for _ in range(len(usage_time_column_list))]
        for field in [x for x in dir(usage_time_data) if not x.startswith('_') and x not in ('metadata', 'query', 'query_class', 'registry')]:
            data = usage_time_data.__getattribute__(field)
            i = usage_time_column_list.index(field)
            fields[i] = data

        fields = fields[2:]
        for i in range(len(usage_time_column_list)-4, -1, -1):
            fields[i] = fields[i] + fields[i+1]
        fields[0] = 100.0
        fields.append(0)
        usage_time_value = fields[usage_time_column_list.index(usage_time)-1]

        frequency_of_use_data = OttFrequencyOfUse_statistics.query.filter_by(
            id=id).first()
        db.session.close()

        fields = [0 for _ in range(len(frequency_of_use_column_list))]
        for field in [x for x in dir(frequency_of_use_data) if not x.startswith('_') and x not in ('metadata', 'query', 'query_class', 'registry')]:
            data = frequency_of_use_data.__getattribute__(field)
            i = frequency_of_use_column_list.index(field)
            fields[i] = data

        fields = fields[2:]
        for i in range(len(frequency_of_use_column_list)-4, -1, -1):
            fields[i] = fields[i] + fields[i+1]
        fields[0] = 100.0
        fields.append(0)
        frequency_of_use_value = fields[frequency_of_use_column_list.index(
            frequency_of_use)-1]

        result_value = (usage_time_value + frequency_of_use_value) / 2

        resp.status_code = 200
        resp.set_data(json.dumps(
            {
                'result': "OTT 사용 등급 테스트 결과",
                'rank_percent': result_value,
                'rank_class': int(result_value // 25) + 1
            }))
        return resp


@bp.route('/usage_statistics', methods=('GET',))
def usage_statistics():
    if request.method == 'GET':
        usage_time_data = OttUsageTime_statistics.query.all()

        usage_time_data_list = []
        for obj in usage_time_data:
            fields = [0 for _ in range(len(usage_time_column_list))]
            for field in [x for x in dir(obj) if not x.startswith('_') and x not in ('metadata', 'query', 'query_class', 'registry')]:
                data = obj.__getattribute__(field)
                i = usage_time_column_list.index(field)
                fields[i] = data
            usage_time_data_list.append(fields)

        frequency_of_use_data = OttFrequencyOfUse_statistics.query.all()
        db.session.close()

        frequency_of_use_data_list = []
        for obj in frequency_of_use_data:
            fields = [0 for _ in range(len(frequency_of_use_column_list))]
            for field in [x for x in dir(obj) if not x.startswith('_') and x not in ('metadata', 'query', 'query_class', 'registry')]:
                data = obj.__getattribute__(field)
                i = frequency_of_use_column_list.index(field)
                fields[i] = data
            frequency_of_use_data_list.append(fields)

        resp.status_code = 200
        resp.set_data(json.dumps(
            {
                'result': "OTT 사용 등급 통계",
                'usage_time_data_list': usage_time_data_list,
                'frequency_of_use_data_list': frequency_of_use_data_list
            }))
        return resp


@bp.route('/contents', methods=('POST',))
def contents():
    if request.method == 'POST':
        request_data = request.get_json()

        if 'lastPageId' not in request_data:
            resp.status_code = 400
            resp.set_data(json.dumps({'result': "Input Validation Error"}))
            return resp

        lastPageId = request_data['lastPageId'] * 12

        if 0 <= lastPageId and lastPageId + 11 > 1010:
            resp.status_code = 400
            resp.set_data(json.dumps({'result': "Out Of Index"}))
            return resp

        ImageURL = db.session.query(OttVideoList.title, OttVideoList.img_url).filter(
            OttVideoList.id.between(lastPageId, lastPageId+11)).all()
        db.session.close()

        ImageURL_list = []
        for obj in ImageURL:
            title = obj.title
            img_url = request.host_url + 'static/images/' + obj.img_url
            ImageURL_list.append([title, img_url])

        resp.status_code = 200
        resp.set_data(json.dumps(
            {
                'ImageURL': ImageURL_list
            }))
        return resp


@bp.route('/recommend', methods=('POST',))
def recommend():
    if request.method == 'POST':
        request_data = request.get_json()

        if 'titles' not in request_data:
            resp.status_code = 400
            resp.set_data(json.dumps({'result': "Input Validation Error"}))
            return resp

        ott_data = db.session.query(OttVideoList).filter(
            OttVideoList.title.in_(request_data["titles"])).all()
        db.session.close()

        genre_list = []
        country_list = []
        for obj in ott_data:
            genre = obj.genre.split('|')
            country = obj.country.split('|')

            genre_list.append(genre[0])
            country_list.append(country[0])

        common_rank, original_rank = get_rank(
            genre_list, country_list)

        resp.status_code = 200
        resp.set_data(json.dumps(
            {
                'common_rank': common_rank,
                'original_rank': original_rank
            }))
        return resp
