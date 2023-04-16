from flask import Flask, request, jsonify, json
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from config import Config
from database import db
from reservation import Reservation
from flask_cors import CORS
from random import randint



def create_app(config_class=Config):

    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)
    db.init_app(app)

    def random_with_N_digits(n):
        range_start = 10**(n-1)
        range_end = (10**n)-1
        return randint(range_start, range_end)

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
        cur = mysql.connection.cursor()
        date = request.json.get("date")
        heure_debut = request.json.get("heure_debut")
        heure_fin = request.json.get("heure_fin")
        description = request.json.get("description")
        email = request.json.get("email")
        query = "UPDATE disponibilites SET "
        if date:
            query += "date = %s, "
        if heure_debut:
            query += "heure_debut = %s, "
        if heure_fin:
            query += "heure_fin = %s, "
        if description:
            query += "description = %s, "
        if email:
            query += "email = %s, "
        query = query[:-2] + " WHERE id = %s"
        values = []
        if date:
            values.append(date)
        if heure_debut:
            values.append(heure_debut)
        if heure_fin:
            values.append(heure_fin)
        if description:
            values.append(description)
        if email:
            values.append(email)
        values.append(id)
        cur.execute(query, tuple(values))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Disponibilité mise à jour avec succès'})

    # Endpoint pour supprimer une disponibilité existante
    @app.route('/reservations/<int:id>', methods=['DELETE'])
    def delete_reservation(id):
        cur = mysql.connection.cursor()

        # Exécuter la requête de suppression
        query = "DELETE FROM disponibilites WHERE id=%s"
        cur.execute(query, (id,))
        mysql.connection.commit()

        # Retourner un message de confirmation
        return jsonify({'message': 'Availability deleted'})

    return app
