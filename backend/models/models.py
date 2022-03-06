from app import db

'''
model.py
이 파일은 데이터베이스의 제약 조건을 명시하는 파일입니다.
'''


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(20), primary_key=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    nickname = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), nullable=False)


class OttUsageTime_statistics(db.Model):
    __tablename__ = 'ott_usage_time_statistics'
    id = db.Column(db.String(10), primary_key=True, nullable=False)
    five_m = db.Column(db.Float, nullable=False)
    ten_m = db.Column(db.Float, nullable=False)
    thirty_m = db.Column(db.Float, nullable=False)
    one_h = db.Column(db.Float, nullable=False)
    two_h = db.Column(db.Float, nullable=False)
    over = db.Column(db.Float, nullable=False)


class OttFrequencyOfUse_statistics(db.Model):
    __tablename__ = 'ott_frequency_of_use_statistics'
    id = db.Column(db.String(10), primary_key=True, nullable=False)
    month_one = db.Column(db.Float, nullable=False)
    month_three = db.Column(db.Float, nullable=False)
    week_six = db.Column(db.Float, nullable=False)
    week_four = db.Column(db.Float, nullable=False)
    week_two = db.Column(db.Float, nullable=False)
    every = db.Column(db.Float, nullable=False)
    many = db.Column(db.Float, nullable=False)


class OttVideoList(db.Model):
    __tablename__ = 'ott_video_list'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    year = db.Column(db.Integer)
    kind = db.Column(db.String(5))
    KMRB = db.Column(db.String(8))
    genre = db.Column(db.String(100))
    country = db.Column(db.String(100))
    cast = db.Column(db.String(100))
    director = db.Column(db.String(100))
    runtime = db.Column(db.Integer)
    provider = db.Column(db.String(100))
    origin = db.Column(db.BOOLEAN)
    img_url = db.Column(db.String(100))


class OttPlatformPrice(db.Model):
    __tablename__ = 'ott_platform_price'
    id = db.Column(db.Integer, primary_key=True)
    provider = db.Column(db.String(5))
    product = db.Column(db.String(8))
    connection = db.Column(db.Integer)
    price = db.Column(db.Integer)


usage_time_column_list = ['id', 'five_m', 'ten_m',
                          'thirty_m', 'one_h', 'two_h', 'over']

frequency_of_use_column_list = ['id', 'month_one', 'month_three',
                                'week_six', 'week_four', 'week_two', 'every', 'many']
