from config import db
from bson import ObjectId
from datetime import datetime

def get_todos(filter_dict=None, sort_by="created_at", order=-1):
    filter_dict = filter_dict or {}
    return list(db.todos.find(filter_dict).sort(sort_by, order))

def get_todo_by_id(todo_id):
    return db.todos.find_one({"_id": ObjectId(todo_id)})

def create_todo(data):
    data["created_at"] = datetime.utcnow()
    data["notes"] = []
    return db.todos.insert_one(data)

def update_todo(todo_id, data):
    db.todos.update_one({"_id": ObjectId(todo_id)}, {"$set": data})

def delete_todo(todo_id):
    db.todos.delete_one({"_id": ObjectId(todo_id)})

def add_note(todo_id, note):
    db.todos.update_one({"_id": ObjectId(todo_id)}, {"$push": {"notes": note}})
