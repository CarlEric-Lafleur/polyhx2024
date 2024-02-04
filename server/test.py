from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
import os



app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADER"] = "Content-Type"



utilisateurs = []
courses = []


class User:
    def __init__(self, id, nom, description="", voiture="", est_electrique=False, rating=0, is_driver=False, points=0, rating_count=0, historique=[], numero_chauffeur=""):
        self.id = id
        self.nom = nom
        self.description = description
        self.voiture = voiture
        self.est_electrique = est_electrique
        self.rating = rating
        self.is_driver = is_driver
        self.points = points
        self.rating_count = rating_count
        self.historique = historique
        self.numero_chauffeur = numero_chauffeur

class Course:
    def __init__(self, conducteur_id, passager_id, destination, cout_points, rating=None, numero_chauffeur=""):
        self.conducteur_id = conducteur_id
        self.passager_id = passager_id
        self.destination = destination
        self.cout_points = cout_points
        self.rating = rating
        self.numero_chauffeur = numero_chauffeur

@app.route('/user', methods=['POST'])
@cross_origin()
def ajouter_utilisateur():
    data = request.get_json()
    print(data)
    id_utilisateur = len(utilisateurs) + 1
    nom = data['nom']
    description = data.get('description', '')
    voiture = data.get('voiture', '')
    est_electrique = data.get('est_electrique', False)
    rating = data.get('rating', 0)
    is_driver = data.get('is_driver', False)
    points = data.get('points', 0)
    rating_count = data.get('rating_count', 0)
    numero_chauffeur = data.get('numero_chauffeur', '')

    nouvel_utilisateur = User(id_utilisateur, nom, description, voiture, est_electrique, rating, is_driver, points, rating_count, numero_chauffeur)
    utilisateurs.append(nouvel_utilisateur.__dict__)

    return jsonify({'message': 'Utilisateur ajouté avec succès'})

@app.route('/user', methods=['GET'])
@cross_origin()
def obtenir_utilisateurs():
    return jsonify({'utilisateurs': utilisateurs})


@cross_origin()

@app.route('/course', methods=['POST'])
def acheter_course():
    data = request.form

    conducteur_nom = data.get('conducteur', '')
    passager_nom = data.get('passager', '')
    destination = data.get('destination', '')
    numero_chauffeur = data.get('numero_chauffeur', '')  

    conducteur = next((u for u in utilisateurs if u['nom'] == conducteur_nom), None)
    passager = next((u for u in utilisateurs if u['nom'] == passager_nom), None)

    if conducteur and passager:
        est_electrique_conducteur = conducteur.get('est_electrique', False)

        cout_points = 75 if est_electrique_conducteur else 100

        passager['points'] -= cout_points

        points_conducteur = 5/3*cout_points if est_electrique_conducteur else cout_points
        conducteur['points'] += points_conducteur

       
        nouvelle_course = Course(conducteur['id'], passager['id'], destination, cout_points, numero_chauffeur=numero_chauffeur)
        courses.append(nouvelle_course.__dict__)

       
        course_existante = next((c for c in courses if c['conducteur_id'] == conducteur['id'] and c['passager_id'] == passager['id']), None)
        if course_existante:
            course_existante['numero_chauffeur'] = numero_chauffeur

        conducteur['historique'].append(nouvelle_course.__dict__)
        passager['historique'].append(nouvelle_course.__dict__)

        return jsonify({'message': 'Course achetée avec succès'})
    else:
        return jsonify({'erreur': 'Le conducteur ou le passager n\'existe pas ou n\'est pas valide'}), 400

@cross_origin
@app.route('/rating', methods=['POST'])
def donner_rating():
    data = request.get_json()

    conducteur_nom = data.get('conducteur', '')
    passager_nom = data.get('passager', '')
    rating = data.get('rating', 0)

    course = next((c for c in courses if c['conducteur_id'] == conducteur_nom and c['passager_id'] == passager_nom), None)

    if course:
        conducteur = next((u for u in utilisateurs if u['nom'] == conducteur_nom), None)
        passager = next((u for u in utilisateurs if u['nom'] == passager_nom), None)

        if conducteur and passager:
            conducteur['rating'] = (conducteur['rating'] * conducteur['rating_count'] + rating) / (conducteur['rating_count'] + 1)
            conducteur['rating_count'] += 1

            passager['rating'] = (passager['rating'] * passager['rating_count'] + rating) / (passager['rating_count'] + 1)
            passager['rating_count'] += 1

            return jsonify({'message': 'Rating ajouté avec succès'})
        else:
            return jsonify({'erreur': 'Le conducteur ou le passager n\'existe pas'}), 400
    else:
        return jsonify({'erreur': 'La course n\'existe pas'}), 400

@cross_origin
@app.route('/historique/<nom_utilisateur>', methods=['GET'])
def obtenir_historique(nom_utilisateur):
 
    utilisateur = next((u for u in utilisateurs if u['nom'] == nom_utilisateur), None)

    if utilisateur:
    
        return jsonify({'historique': utilisateur['historique']})
    else:
        return jsonify({'erreur': 'L\'utilisateur spécifié n\'existe pas'}), 400

@cross_origin
@app.route('/routes', methods=['GET'])
def obtenir_route():
    try:
        
        with open("mapData.json", "r") as f:
            contenu_json = f.read()

        return jsonify({'routes': contenu_json})
    except Exception as e:
       
        return jsonify({'erreur': str(e)}), 500

@app.route('/courses_disponibles', methods=['GET'])
def obtenir_courses_disponibles():
   
    courses_disponibles = [c for c in courses if c['passager_id'] is None]

   
    data_courses_disponibles = []
    for course in courses_disponibles:
        
        conducteur = next((u for u in utilisateurs if u['id'] == course['conducteur_id']), None)

        if conducteur:
            data_courses_disponibles.append({
                'conducteur_nom': conducteur['nom'],
                'destination': course['destination'],
                'cout_points': course['cout_points'],
                'rating_conducteur': conducteur['rating'],
            })

    return jsonify({'courses_disponibles': data_courses_disponibles})

@cross_origin
@app.route("/photo", methods=["GET"])
def get_photos():
    script_directory = os.path.dirname(os.path.abspath(__file__))
    image_path = os.path.join(script_directory, "photo", "image.jpg")
    return send_file(image_path)


if __name__ == '__main__':
    app.run(debug=True)