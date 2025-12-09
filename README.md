# Interview Question Generator

An AI-powered application that extracts skills from resumes and generates personalized interview questions using machine learning models.

## 🚀 Features

- **Resume Upload**: Upload PDF resumes for skill extraction
- **Skill Extraction**: Uses spaCy NLP model to extract technical skills from resumes
- **Question Generation**: Generates interview questions using T5 transformer model
- **User Authentication**: Secure login/signup with JWT tokens
- **Admin Dashboard**: View statistics, active users, and feedback
- **Question History**: Save and download generated questions as PDF

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **Python** (3.11 recommended)
- **MongoDB** (running locally or connection string)
- **Conda** or **virtualenv** (for Python virtual environment)

## 📥 Model Download

Download the required ML models from:
https://drive.google.com/file/d/1mmMLT1GmvKkVPn9Wh2wGhAceXr26-Mao/view?usp=sharing

After downloading, extract the models into the `flask_backend` directory. The directory structure should be:
```
flask_backend/
├── skill_extractor_model/
├── qg_model_ml/
├── qg_model_tokenizer/
└── app.py
```

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Navadeepbudime/Interview_Question_Generator.git
cd Interview_Question_Generator
```

### 2. Backend Setup (Node.js)

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
MONGO_URI=mongodb://localhost:27017/users
JWT_SECRET=your_jwt_secret
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Flask Backend Setup (Python)

**Important**: Use Python 3.11 for compatibility with PyMuPDF and transformers.

#### Option A: Using Conda (Recommended)

```bash
cd flask_backend

# Create conda environment
conda create -n iqgen python=3.11
conda activate iqgen

# Install dependencies
pip install -r requirements.txt
```

#### Option B: Using virtualenv

```bash
cd flask_backend

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 5. MongoDB Setup

Start MongoDB locally:
```bash
# macOS (Homebrew)
brew services start mongodb-community
# OR
mongod --config /opt/homebrew/etc/mongod.conf

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 6. Create Admin User

```bash
cd backend
node scripts/createAdmin.js
```

Default admin credentials:
- **Email**: `admin@example.com`
- **Password**: `admin123`

⚠️ **Change these credentials in production!**

## 🏃 Running the Application

You need **4 terminal windows** to run all services:

### Terminal 1: MongoDB
```bash
mongod --config /opt/homebrew/etc/mongod.conf
# Or use: brew services start mongodb-community
```

### Terminal 2: Node.js Backend
```bash
cd backend
node server.js
# Or: npx node@18 server.js (if using Node 25+)
```
Backend runs on `http://localhost:5000`

### Terminal 3: Flask Backend (Python)
```bash
cd flask_backend
conda activate iqgen  # or: source venv/bin/activate
python app.py
```
Flask backend runs on `http://localhost:9000`

### Terminal 4: Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## 🔧 Common Issues & Solutions

### Issue 1: Node.js Version Compatibility

**Error**: `TypeError: Cannot read properties of undefined (reading 'prototype')`

**Solution**: Use Node.js v18 instead of v25+
```bash
npx node@18 server.js
```

### Issue 2: MongoDB Connection Error

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution**: 
- Ensure MongoDB is running: `brew services start mongodb-community`
- Check MongoDB is listening: `lsof -nP -i :27017`

### Issue 3: Flask Model Loading Error

**Error**: `ValueError: early_stopping must be a boolean or 'never', but is None`

**Solution**: The config files have been fixed. If you encounter this:
```bash
cd flask_backend
python3 -c "import json; f=open('qg_model_ml/config.json'); d=json.load(f); f.close(); d['early_stopping'] = True; f=open('qg_model_ml/config.json','w'); json.dump(d, f, indent=2); f.close()"
```

### Issue 4: PyMuPDF Installation Fails

**Error**: Build errors during `pip install pymupdf`

**Solution**: Use Python 3.11 (not 3.13+)
```bash
conda create -n iqgen python=3.11
conda activate iqgen
pip install -r requirements.txt
```

### Issue 5: Uploads Directory Not Found

**Error**: `Cannot GET /uploads/...`

**Solution**: Ensure the directory is named `uploads` (lowercase) not `Uploads`. The server.js has been fixed to use lowercase.

### Issue 6: Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**: 
```bash
# Find and kill process on port 5000
lsof -nP -i :5000 | awk '{print $2}' | xargs kill -9

# Or use a different port in .env
PORT=5001
```

### Issue 7: SentencePiece Missing

**Error**: `ModuleNotFoundError: No module named 'sentencepiece'`

**Solution**: 
```bash
pip install sentencepiece==0.2.0
```

### Issue 8: Model Path Errors

**Error**: FileNotFoundError for model files

**Solution**: Ensure model paths are relative (already fixed in app.py):
- Models should be in: `flask_backend/skill_extractor_model/`, `flask_backend/qg_model_ml/`, etc.
- The code uses `Path(__file__).resolve().parent` for cross-platform compatibility

## 📁 Project Structure

```
Interview_Question_Generator/
├── backend/                 # Node.js/Express backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── scripts/            # Utility scripts (createAdmin.js)
│   ├── uploads/            # Uploaded resume files
│   └── server.js           # Main server file
├── frontend/               # React/Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app component
│   └── package.json
├── flask_backend/          # Python/Flask ML backend
│   ├── skill_extractor_model/  # spaCy model for skill extraction
│   ├── qg_model_ml/           # T5 model for question generation
│   ├── qg_model_tokenizer/    # Tokenizer for T5 model
│   ├── app.py                  # Flask application
│   └── requirements.txt        # Python dependencies
└── README.md

```

## 🔐 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/users
JWT_SECRET=your_secret_key_here
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Flask Backend
No .env file needed, but ensure model directories are present.

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Reset password

### Files
- `POST /api/files/upload` - Upload resume (requires auth)
- `GET /api/files/myfiles` - Get user's files (requires auth)
- `DELETE /api/files/:id` - Delete file (requires auth)

### Questions
- `POST /api/questions/store` - Store generated questions (requires auth)
- `GET /api/questions/myquestions` - Get user's questions (requires auth)
- `GET /api/questions/download/:id` - Download questions as PDF (requires auth)

### Admin
- `GET /api/admin/stats` - Get statistics (requires admin auth)
- `GET /api/admin/active-users` - Get active users (requires admin auth)
- `GET /api/admin/feedbacks` - Get all feedbacks (requires admin auth)

### Flask Backend
- `POST /api/generate-questions` - Generate questions from resume (proxied through Node.js backend)

## 🧪 Testing

1. Start all services (MongoDB, Backend, Flask, Frontend)
2. Open `http://localhost:5173`
3. Sign up or login
4. Upload a resume PDF
5. Wait for questions to be generated
6. View/download questions

## 🐛 Troubleshooting

### Check Service Status
```bash
# MongoDB
lsof -nP -i :27017

# Backend
lsof -nP -i :5000

# Flask
lsof -nP -i :9000

# Frontend
lsof -nP -i :5173
```

### View Logs
- Backend: Check terminal output
- Flask: Check `/tmp/flask_output.log` or terminal output
- Frontend: Check browser console

### Reset Everything
```bash
# Stop all services
pkill -f "node server.js"
pkill -f "python app.py"
pkill -f "mongod"
pkill -f "vite"

# Restart MongoDB
brew services restart mongodb-community

# Restart all services in order
```

## 📦 Dependencies

### Backend (Node.js)
- express
- mongoose
- jsonwebtoken
- bcryptjs
- multer
- nodemailer
- cors
- pdfkit

### Frontend
- react
- react-router-dom
- axios
- tailwindcss
- vite

### Flask Backend (Python)
- Flask==3.0.3
- flask-cors==5.0.0
- pymupdf==1.24.10
- spacy==3.7.6
- transformers==4.44.2
- torch==2.5.0
- sentencepiece==0.2.0
- python-dotenv==1.0.1
- requests==2.32.3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

[Add your license here]

## 👥 Authors

- Navadeep Budime
- Contributors welcome!

## 🙏 Acknowledgments

- spaCy for NLP capabilities
- Hugging Face Transformers for T5 model
- PyMuPDF for PDF processing

---

**Note**: This project requires significant computational resources for ML model inference. Ensure adequate RAM and CPU for optimal performance.
