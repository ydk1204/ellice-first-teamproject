import os
from personalkey import db_connection_setting, JWT_KEY

'''
config.py
이 파일은 Flask와 라이브러리 설정을 위한 파일입니다.
'''

# 폴더 구조가 달라져도, 현재 폴더를 가져와서 사용할 수 있도록 설정합니다.
BASE_DIR = os.path.dirname(__file__)

DB = db_connection_setting

# DB 커넥션을 위한 변수
SQLALCHEMY_DATABASE_URI = f'{DB["db_type"]}://{DB["db_user"]}:{DB["db_passwd"]}@{DB["db_host"]}:{DB["db_port"]}/{DB["db_name"]}'

# 메모리 사용량 낮추기 위한 옵션
SQLALCHEMY_TRACK_MODIFICATIONS = False

# JWT 통신키
JWT_SECRET_KEY = JWT_KEY
