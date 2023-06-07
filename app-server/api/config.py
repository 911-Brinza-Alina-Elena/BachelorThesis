import os
import random
import string
from datetime import timedelta


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', None)
    if not SECRET_KEY:
        SECRET_KEY = ''.join(random.choice(string.ascii_lowercase) for _ in range(32))
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', None)
    if not JWT_SECRET_KEY:
        JWT_SECRET_KEY = ''.join(random.choice(string.ascii_lowercase) for _ in range(32))
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DB_ENGINE = os.getenv('DB_ENGINE')
    DB_USERNAME = os.getenv('DB_USERNAME')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_HOST = os.getenv('DB_HOST')
    DB_PORT = os.getenv('DB_PORT')
    DB_NAME = os.getenv('DB_NAME')
    SQLALCHEMY_DATABASE_URI = f'{DB_ENGINE}://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'