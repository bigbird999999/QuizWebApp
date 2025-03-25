from config import db


class Quiz(db.Model): #Quiz Table
    __table_name__='Quiz'
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(500), unique=False, nullable=False)
    option1 = db.Column(db.String(80), unique=False, nullable=False)
    option2 = db.Column(db.String(80), unique=False, nullable=False)
    option3 = db.Column(db.String(80), unique=False, nullable=False)
    option4 = db.Column(db.String(80), unique=False, nullable=False)
    answer_option=db.Column(db.String(80),unique=False,nullable=False)
    def to_json(self):
        return {
            "id": self.id,
            "question": self.question,
            "option1": self.option1,
            "option2": self.option2,
            "option3": self.option3,
            "option4": self.option4,
            "answerOption":self.answer_option,
        }
class User(db.Model): #User (Admin) Table
    __table_name__='User'
    __bind_key__ = 'db2'
    username=db.Column(db.String(80), primary_key=True)
    password=db.Column(db.String(80),unique=False)
    