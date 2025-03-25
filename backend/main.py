from flask import request, jsonify
from config import app,db
from models import Quiz,User

@app.route('/login', methods=['POST']) #Login API
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username=='admin' and password=='password':
        return jsonify({"username": username, "password":password})
    
    return jsonify({"error": "Invalid credentials"}), 401 #401 unauthorized access


@app.route("/questions", methods=["GET"]) #Reading Questions API
def get_questions():
    questions = Quiz.query.all()
    json_questions = list(map(lambda x: x.to_json(), questions))
    return jsonify({"questions": json_questions})


@app.route("/create_question", methods=["POST"]) #Creating Questions API
def create_question():
    question = request.json.get("question")
    option1 = request.json.get("option1")
    option2 = request.json.get("option2")
    option3 = request.json.get("option3")
    option4 = request.json.get("option4")
    answer_option = request.json.get("answerOption")


    if not question or not option1 or not option2 or not option3 or not option4 or not answer_option:
        return (
            jsonify({"message": "You must include question text, four options and the correct option."}),
            400,
        )
    if answer_option not in [option1, option2, option3, option4]: #Validating whether answer is among the four options
        return (
            jsonify({"message": "Answer Option must be from one of the options."}),
            400,
        )

    new_question = Quiz(question=question, option1=option1, option2=option2, option3=option3, option4=option4, answer_option=answer_option)
    try:
        db.session.add(new_question)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Question added!"}), 201


@app.route("/update_question/<int:id>", methods=["PUT"]) #Updating Questions API
def update_question(id):
    question =Quiz.query.get(id)

    if not question:
        return jsonify({"message": "Question not found"}), 404

    data = request.json
    question.question = data.get("question", question.question)
    question.option1 = data.get("option1", question.option1)
    question.option2 = data.get("option2", question.option2)
    question.option3 = data.get("option3", question.option3)
    question.option4 = data.get("option4", question.option4)
    question.answer_option = data.get("answerOption", question.answer_option)

    db.session.commit()

    return jsonify({"message": "Question Updated"}), 200


@app.route("/delete_question/<int:id>", methods=["DELETE"]) #Deleting Questions API
def delete_question(id): 
    question = Quiz.query.get(id)

    if not question:
        return jsonify({"message": "Question not found"}), 404

    db.session.delete(question)
    db.session.commit()

    return jsonify({"message": "Question deleted!"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all(bind_key=[None,"db2"])
        existing_user = User.query.filter_by(username='admin').first() #Checking if the admin is already in the database
        if not existing_user: #Adding the admin user to the User database
            user=User(username='admin',password='password')
            db.session.add(user)
            db.session.commit()
    app.run(debug=True)
