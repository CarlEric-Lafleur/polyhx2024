from flask import Flask, request, jsonify

app = Flask(__name__)
utilisateurs = []
courses = []

class User:
    def __init__(self, id, nom, description="", voiture="", est_electrique=False, rating=0, is_driver=False, points=0, rating_count=0, historique=[]):
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

class Course:
    def __init__(self, conducteur_id, passager_id, destination, cout_points, rating=None):
        self.conducteur_id = conducteur_id
        self.passager_id = passager_id
        self.destination = destination
        self.cout_points = cout_points
        self.rating = rating

@app.route('/user', methods=['POST'])
def ajouter_utilisateur():
    data = request.get_json()

    id_utilisateur = len(utilisateurs) + 1
    nom = data['nom']
    description = data.get('description', '')
    voiture = data.get('voiture', '')
    est_electrique = data.get('est_electrique', False)
    rating = data.get('rating', 0)
    is_driver = data.get('is_driver', False)
    points = data.get('points', 0)
    rating_count = data.get('rating_count', 0)

    nouvel_utilisateur = User(id_utilisateur, nom, description, voiture, est_electrique, rating, is_driver, points, rating_count)
    utilisateurs.append(nouvel_utilisateur.__dict__)

    return jsonify({'message': 'Utilisateur ajouté avec succès'})

@app.route('/user', methods=['GET'])
def obtenir_utilisateurs():
    return jsonify({'utilisateurs': utilisateurs})
@app.route('/course', methods=['POST'])
def acheter_course():
    data = request.get_json()

    conducteur_nom = data.get('conducteur', '')
    passager_nom = data.get('passager', '')
    destination = data.get('destination', '')

    conducteur = next((u for u in utilisateurs if u['nom'] == conducteur_nom), None)
    passager = next((u for u in utilisateurs if u['nom'] == passager_nom), None)

    if conducteur and passager:
        est_electrique_conducteur = conducteur.get('est_electrique', False)

        # Assigner directement le coût en points en fonction du type de voiture
        cout_points = 75 if est_electrique_conducteur else 100

        # Appliquer le coût pour le passager
        passager['points'] -= cout_points

        # Appliquer les points pour le conducteur
        points_conducteur = 5/3*cout_points if est_electrique_conducteur else cout_points
        conducteur['points'] += points_conducteur

        nouvelle_course = Course(conducteur['id'], passager['id'], destination, cout_points)
        courses.append(nouvelle_course.__dict__)

        # Ajouter les détails de la course à l'historique des utilisateurs
        conducteur['historique'].append(nouvelle_course.__dict__)
        passager['historique'].append(nouvelle_course.__dict__)

        return jsonify({'message': 'Course achetée avec succès'})
    else:
        return jsonify({'erreur': 'Le conducteur ou le passager n\'existe pas ou n\'est pas valide'}), 400

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

@app.route('/historique/<nom_utilisateur>', methods=['GET'])
def obtenir_historique(nom_utilisateur):
    # Trouver l'utilisateur avec le nom spécifié
    utilisateur = next((u for u in utilisateurs if u['nom'] == nom_utilisateur), None)

    if utilisateur:
        # Renvoyer l'historique de l'utilisateur spécifié
        return jsonify({'historique': utilisateur['historique']})
    else:
        return jsonify({'erreur': 'L\'utilisateur spécifié n\'existe pas'}), 400

from flask import Flask, jsonify, send_file

app = Flask(__name__)

@app.route('/routes', methods=['GET'])
def obtenir_route():
    try:
        # Ouvrir et lire le contenu du fichier mapData.json
        with open("mapData.json", "r") as f:
            contenu_json = f.read()

        # Renvoyer le contenu en tant que réponse JSON
        return jsonify({'routes': contenu_json})
    except Exception as e:
        # En cas d'erreur, renvoyer une réponse d'erreur
        return jsonify({'erreur': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
