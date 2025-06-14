from flask import Flask
from flask_cors import CORS
from routes.todos import todos_bp
from routes.users import users_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)


CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}}, supports_credentials=True)


app.register_blueprint(todos_bp, url_prefix="/api/todos")
app.register_blueprint(users_bp, url_prefix="/api/users")

@app.route("/")
def home():
    return "Welcome to the Todo API! 🎉"

if __name__ == "__main__":
    app.run(debug=True)
