import json
import os.path

from flask_cors import CORS
from flask import Flask

from api.models import db
from api.routes import rest_api

app = Flask(__name__)
app.config.from_object('api.config.Config')

db.init_app(app)
rest_api.init_app(app)
CORS(app)

@app.before_first_request
def initialize_database():
    try:
        db.create_all()
    except Exception as e:
        print(e)
        # Fall back to sqlite
        BASE_DIR = os.path.abspath(os.path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, 'db.sqlite3')
        db.create_all()

@app.after_request
def after_request(response):
    if int(response.status_code) >= 400:
        response_data = json.loads(response.get_data())
        if "errors" in response_data:
            response_data = {"success": False, "msg": list(response_data["errors"].items())[0][1]}
            response.set_data(json.dumps(response_data))
        response.headers.add('Content-Type', 'application/json')
    return response