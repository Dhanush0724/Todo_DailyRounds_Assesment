from flask import Blueprint, request, jsonify
from models.todo import *



todos_bp = Blueprint('todos', __name__, url_prefix='/api/todos')

@todos_bp.route("/", methods=["GET"])
def list_todos():
    filters = {}
    if "priority" in request.args:
        filters["priority"] = request.args["priority"]
    if "created_by" in request.args:
        filters["created_by"] = request.args["created_by"]
    if "tag" in request.args:
        filters["tags"] = request.args["tag"]

    sort_by = request.args.get("sort_by", "created_at")
    order = int(request.args.get("order", -1))
    skip = int(request.args.get("skip", 0))
    limit = int(request.args.get("limit", 10))

    todos = db.todos.find(filters).sort(sort_by, order).skip(skip).limit(limit)
    return jsonify([serialize(todo) for todo in todos])

@todos_bp.route("/", methods=["POST"])
def add_todo():
    data = request.json
    result = create_todo(data)
    return jsonify({"id": str(result.inserted_id)})

@todos_bp.route("/<todo_id>", methods=["GET"])
def todo_detail(todo_id):
    todo = get_todo_by_id(todo_id)
    return jsonify(serialize(todo))

@todos_bp.route("/<todo_id>", methods=["PUT"])
def edit_todo(todo_id):
    update_todo(todo_id, request.json)
    return jsonify({"message": "Updated"})

@todos_bp.route("/<todo_id>", methods=["DELETE"])
def remove_todo(todo_id):
    delete_todo(todo_id)
    return jsonify({"message": "Deleted"})

@todos_bp.route("/<todo_id>/notes", methods=["POST"])
def add_note_route(todo_id):
    note = request.json.get("note")
    add_note(todo_id, note)
    return jsonify({"message": "Note added"})

def serialize(todo):
    todo["_id"] = str(todo["_id"])
    return todo

def get_todos(filter_dict=None, sort_by="created_at", order=-1):
    filter_dict = filter_dict or {}
    return list(db.todos.find(filter_dict).sort(sort_by, order))
