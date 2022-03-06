import config

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

'''
app.py
이 파일은 Flask app 실행을 위한 파일입니다.
'''

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    app.config.from_object(config)  # config 에서 가져온 파일을 사용합니다.

    jwt = JWTManager(app)

    db.init_app(app)  # SQLAlchemy 객체를 app 객체와 이어줍니다.
    Migrate().init_app(app, db)

    from api import main_api
    from models import models
    app.register_blueprint(main_api.bp)

    return app


if __name__ == "__main__":
    create_app().run(debug=False, port=5000, host='0.0.0.0')
