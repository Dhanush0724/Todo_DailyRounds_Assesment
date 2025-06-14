from flask import Blueprint, jsonify
from models.user import get_all_users, create_default_users

users_bp = Blueprint("users", __name__)

@users_bp.route("/", methods=["GET"])
def get_users():
    create_default_users()
    return jsonify(get_all_users())
