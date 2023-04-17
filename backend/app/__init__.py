from flask import Flask, request, jsonify, json
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from config import Config
from database import db
from reservation import Reservation
from flask_cors import CORS
from random import randint



def create_app(config_class=Config):

    app = Flask(__name__)
    auth = HTTPBasicAuth()

    users = {
        "user": generate_password_hash("user")
    }

    app.config.from_object(config_class)
    CORS(app)
    db.init_app(app)

    def random_with_N_digits(n):
        range_start = 10**(n-1)
        range_end = (10**n)-1
        return randint(range_start, range_end)

    @auth.verify_password
    def verify_password(username, password):
        if username in users and \
                check_password_hash(users.get(username), password):
            return username

    @app.route('/reservations', methods=['POST'])
    def create_reservation():
        data = request.json
        print(data)
        start_time = data['startTime']
        end_time = data['endTime']
        if len(start_time) > 5:
            start_time = start_time[:-3]
            end_time = end_time[:-3]

        reservation = Reservation(date=data['date'],
                                  start_time=start_time,
                                  end_time=end_time,
                                  description=data['description'],
                                  pin=random_with_N_digits(7),
                                  email=data['email'])
        db.session.add(reservation)
        db.session.commit()
        return jsonify({'message': 'Reservation créée avec succès'})

    @app.route('/reservations', methods=['GET'])
    def get_reservations():
        reservations = Reservation.query.all()
        dispo_list = []
        for elem in reservations:
            dispo_dict = {
                'id': elem.id,
                'date': elem.date,
                'start': elem.start_time,
                'end': elem.end_time,
                'description': elem.description,
                'email': elem.email
            }
            dispo_list.append(dispo_dict)

        return jsonify(dispo_list)


    @app.route('/reservations/<int:id>', methods=['PUT'])
    def update_reservation(id):
        date = request.json.get("date")
        heure_debut = request.json.get("heure_debut")
        heure_fin = request.json.get("heure_fin")
        description = request.json.get("description")
        email = request.json.get("email")
        
        return jsonify({'message': 'Disponibilité mise à jour avec succès'})

    # Endpoint pour supprimer une reservation existante
    @app.route('/reservations/<int:id>', methods=['DELETE'])
    @auth.login_required
    def delete_reservation(id):
        reservation = Reservation.query.get(id)
        db.session.delete(reservation)
        db.session.commit()
        # Retourner un message de confirmation
        return jsonify({'message': 'Availability deleted'})

    return app
