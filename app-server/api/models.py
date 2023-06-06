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
        return check_password_hash(self.password, password)

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
        cls_dict = {'_id': self.id, 'username': self.username, 'email': self.email, 'type_of_account': self.type_of_account}
        return cls_dict

    def to_json(self):
        return self.to_dict()

    def get_all_details(self):
        details = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'type_of_account': self.type_of_account,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'date_of_birth': str(self.date_of_birth),
            'gender': self.gender,
            'country': self.country,
            'city': self.city,
            'therapist_speciality': self.therapist_speciality,
            'therapist_location': self.therapist_location
        }
        return details


class JWTTokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jwt_token = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<JWTTokenBlocklist {self.jwt_token}>'

    def save(self):
        db.session.add(self)
        db.session.commit()


class JournalEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    entry_date = db.Column(db.Date, nullable=False)
    entry_title = db.Column(db.String(100), nullable=False)
    entry_text = db.Column(db.Text(), nullable=False)
    predicted_emotion = db.Column(db.String(50), nullable=True)

    def __repr__(self):
        return f'<JournalEntries {self.id}>'

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, entry_id):
        return cls.query.get_or_404(entry_id)

    @classmethod
    def find_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()

    @classmethod
    def find_by_entry_date(cls, entry_date):
        return cls.query.filter_by(entry_date=entry_date).all()

    @classmethod
    def find_by_entry_title(cls, entry_title):
        return cls.query.filter_by(entry_title=entry_title).all()

    def update_entry_title(self, entry_title):
        self.entry_title = entry_title

    @classmethod
    def find_by_entry_text(cls, entry_text):
        return cls.query.filter_by(entry_text=entry_text).all()

    def update_entry_text(self, entry_text):
        self.entry_text = entry_text

    @classmethod
    def find_by_predicted_emotion(cls, predicted_emotion):
        return cls.query.filter_by(predicted_emotion=predicted_emotion).all()

    def update_predicted_emotion(self, predicted_emotion):
        self.predicted_emotion = predicted_emotion

    def to_dict(self):
        cls_dict = {'_id': self.id, 'user_id': self.user_id, 'entry_date': str(self.entry_date), 'entry_title': self.entry_title, 'entry_text': self.entry_text, 'entry_emotion': self.predicted_emotion}
        return cls_dict

    def to_json(self):
        return self.to_dict()


class PatientTherapistRelation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, nullable=False, unique=True)
    therapist_id = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<PatientTherapistRelation {self.id}>'

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, relation_id):
        return cls.query.get_or_404(relation_id)

    @classmethod
    def find_by_patient_id(cls, patient_id):
        return cls.query.filter_by(patient_id=patient_id).all()

    @classmethod
    def find_by_therapist_id(cls, therapist_id):
        return cls.query.filter_by(therapist_id=therapist_id).all()

    def to_dict(self):
        cls_dict = {'_id': self.id, 'patient_id': self.patient_id, 'therapist_id': self.therapist_id}
        return cls_dict

    def to_json(self):
        return self.to_dict()