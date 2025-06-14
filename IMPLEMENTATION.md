# 📝 Todo_DailyRounds_Assessment

## 📌 Tech Stack Chosen

### 🔹 Frontend
- **Framework:** Angular
- **HTTP Client:** Angular `HttpClientModule`

### 🔹 Backend
- **Framework:** Flask (Python)
- **Database:** MongoDB

---

## 🚀 How to Run the Application

### 📁 Clone the Repository

```bash
git clone https://github.com/Dhanush0724/Todo_DailyRounds_Assesment.git
cd Todo_DailyRounds_Assesment


⚙️ Backend Setup

cd backend
python -m venv venv
source venv\Scripts\activate  # Windows
# or for Linux/macOS:
# source venv/bin/activate

pip install -r requirements.txt
python app.py
✅ Flask server will start running at: http://127.0.0.1:5000

💻 Frontend Setup
cd frontend
npm install
ng serve
✅ Angular app will be live at: http://localhost:4200

⚠️ Important:
Make sure both backend and frontend are running in separate terminal windows to ensure proper communication.

## ✅ Implemented Features

### 1. ✅ Todo Management
- Create new todos with titles and descriptions  
- Add tags and priorities to todos (High, Medium, Low)  
- Tag/mention other users in todos using `@username`  
-  Edit existing todos  
- [Delete todos  

### 2. ✅ Todo Details
- View todo details (tags, priority, notes, users)  
- Add notes via a modal when clicking an icon next to the todo  

### 3. ✅ List View Features
- List all todos with basic information  
- Pagination implemented (with limit and skip)  
- Filter todos by tags, priority, or users  
- Sort todos by creation date or priority  


optinal features are not implemented 
