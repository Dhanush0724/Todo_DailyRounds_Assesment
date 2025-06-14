⚙️ Backend Setup
bash
Copy code
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# or for Linux/macOS:
# source venv/bin/activate

pip install -r requirements.txt
python app.py
✅ Flask server will start running at: http://127.0.0.1:5000

💻 Frontend Setup
bash
Copy code
cd frontend
npm install
ng serve
✅ Angular app will be live at: http://localhost:4200

⚠️ Important:
Make sure both backend and frontend are running in separate terminal windows to ensure proper communication.

✅ Summary
This project is a full-stack Todo List application using Angular, Flask, and MongoDB. It covers features like:

Adding, editing, and deleting todos

Priority and tagging system

User mentions with @username

Notes with modal support

Filtering, sorting, pagination

Additional features and enhancements can be built easily upon the existing modular structure.
