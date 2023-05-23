from datetime import datetime, timedelta
from functools import wraps

import jwt as jwt
from flask import request
from flask_restx import Api, fields, Resource

from api.config import Config
from api.models import User, JWTTokenBlocklist, db

rest_api = Api(version='1.0', title='TherapEase REST API')

login_model = rest_api.model('LoginModel', {
    'email': fields.String(required=True, min_length=4, max_length=64),
    'password': fields.String(required=True, min_length=4, max_length=64)
})

register_model = rest_api.model('RegisterModel', {
    'username': fields.String(required=True, min_length=4, max_length=64),
    'email': fields.String(required=True, min_length=4, max_length=64),
    'password': fields.String(required=True, min_length=4, max_length=64),
    'type_of_account': fields.String(required=True, min_length=4, max_length=64),
    'first_name': fields.String(required=True, min_length=4, max_length=64),
    'last_name': fields.String(required=True, min_length=4, max_length=64),
    'date_of_birth': fields.Date(required=True),
    'gender': fields.String(required=True, min_length=4, max_length=64),
    'country': fields.String(required=True, min_length=4, max_length=64),
    'city': fields.String(required=True, min_length=4, max_length=64),
    'therapist_speciality': fields.String(required=False, min_length=0, max_length=64),
    'therapist_location': fields.String(required=False, min_length=0, max_length=64)
})

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        if not token:
            return {'success': False, 'msg': 'Valid JWT Token is missing'}, 400
        try:
            data = jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
            current_user = User.find_by_id(data['email'])
            if not current_user:
                return {'success': False, 'msg': 'Invalid JWT Token'}, 400
            token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()
            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400
            if not current_user.check_jwt_auth_active():
                return {'success': False, 'msg': 'JWT Token authentication is not active for this user'}, 400
        except Exception as e:
            return {"success": False, "msg": "Invalid JWT Token"}, 400
        return f(current_user, *args, **kwargs)
    return decorator


@rest_api.route('/api/users/register')
class Register(Resource):
    @rest_api.expect(register_model, validate=True)
    def post(self):
        request_data = request.get_json()
        _username = request_data.get('username')
        _email = request_data.get('email')
        _password = request_data.get('password')
        _type_of_account = request_data.get('type_of_account')
        _first_name = request_data.get('first_name')
        _last_name = request_data.get('last_name')
        _date_of_birth = request_data.get('date_of_birth')
        _gender = request_data.get('gender')
        _country = request_data.get('country')
        _city = request_data.get('city')
        _therapist_speciality = None
        _therapist_location = None
        if _type_of_account == 'therapist':
            _therapist_speciality = request_data.get('therapist_speciality')
            _therapist_location = request_data.get('therapist_location')
        if User.find_by_email(_email):
            return {'success': False, 'msg': 'User already exists'}, 400
        new_user = User(username=_username,
                        email=_email,
                        type_of_account=_type_of_account,
                        first_name=_first_name,
                        last_name=_last_name,
                        date_of_birth=_date_of_birth,
                        gender=_gender,
                        country=_country,
                        city=_city,
                        therapist_speciality=_therapist_speciality,
                        therapist_location=_therapist_location)
        new_user.set_password(_password)
        new_user.save()

        return {'success': True, 'msg': 'User created successfully'}, 201


@rest_api.route('/api/users/login')
class Login(Resource):
    @rest_api.expect(login_model, validate=True)
    def post(self):
        request_data = request.get_json()
        _email = request_data.get('email')
        _password = request_data.get('password')
        user_exists = User.find_by_email(_email)
        if not user_exists:
            return {'success': False, 'msg': 'User does not exist'}, 400
        if not user_exists.check_password(_password):
            return {'success': False, 'msg': 'Invalid password'}, 400

        token = jwt.encode({'email': _email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, Config.SECRET_KEY)
        user_exists.set_jwt_auth_active(True)
        user_exists.save()
        return {'success': True, 'user': user_exists.to_json(), 'token': token}, 200
