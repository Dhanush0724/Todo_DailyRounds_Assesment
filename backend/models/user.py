from config import db

def get_all_users():
    return list(db.users.find({}, {"_id": 0}))

def user_exists(username):
    return db.users.find_one({"username": username}) is not None

def create_default_users():
    usernames = ["James", "sam", "rahul", "dhanush", "sanjay"]
    for name in usernames:
        if not user_exists(name):
            db.users.insert_one({"username": name})
