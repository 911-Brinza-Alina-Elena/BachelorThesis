from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.Text(), nullable=False)
    type_of_account = db.Column(db.String(20), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    therapist_speciality = db.Column(db.String(50), nullable=True)
    therapist_location = db.Column(db.String(250), nullable=True)
    jwt_auth_active = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return self.password == password

    def update_email(self, email):
        self.email = email

    def update_username(self, username):
        self.username = username

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, status):
        self.jwt_auth_active = status

    @classmethod
    def find_by_id(cls, user_id):
        return cls.query.get_or_404(user_id)

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def to_dict(self):
        cls_dict = {'_id': self.id, 'username': self.username, 'email': self.email}
        return cls_dict

    def to_json(self):
        return self.to_dict()


class JWTTokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jwt_token = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<JWTTokenBlocklist {self.jwt_token}>'

    def save(self):
        db.session.add(self)
        db.session.commit()