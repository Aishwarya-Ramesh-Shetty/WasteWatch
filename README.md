# ♻️ WasteWatch AI — Detect. Predict. Prevent.

> An AI-powered waste-management platform that helps identify emerging waste hotspots, analyze citizen reports, and support preventive municipal action.

---

## 🌐 Live Demo

### Frontend

**Live Website:**  
`waste-watch-sigma.vercel.app`

### Backend

**Live Website:**  
`https://wastewatch-backend-vbw6.onrender.com`


---
# 🔐 Demo Authentication & Account Setup

WasteWatch AI uses role-based authentication with three roles:

- `CITIZEN` — users can register themselves through the application.
- `MUNICIPAL_OFFICER` — accounts are created by an Admin.
- `ADMIN` — manages Municipal Officer accounts.

## Admin Account

The Admin account is created from the backend using environment variables.

Set the following variables in the backend environment:

```env
ADMIN_EMAIL=admin@wastewatch.ai
ADMIN_PASSWORD=<YOUR_ADMIN_PASSWORD>
```
---
## 📖 Overview

Waste management is often reactive:

```text
Waste accumulates
       ↓
Citizen reports the problem
       ↓
Municipality receives complaint
       ↓
Cleanup is scheduled
```

WasteWatch AI aims to move this process one step earlier.

The platform combines citizen reports, location, time, waste category, severity, and historical patterns to identify areas that may be developing into waste hotspots.

The goal is to support a transition from:

**Reactive Cleanup → Preventive Action**

---

## 🎯 Problem Statement

Traditional waste management often responds after waste has already accumulated.

A few isolated reports may not appear urgent individually, but when reports begin increasing in the same location over time, they can indicate an emerging hotspot.

WasteWatch AI focuses on identifying these patterns early and helping municipal teams decide where preventive action may be needed.

---

## 💡 Proposed Solution

WasteWatch AI connects the complete workflow:

```text
Citizen Report
      ↓
Visual Intelligence
      ↓
Location + Time Analysis
      ↓
Historical Pattern Analysis
      ↓
Hotspot Risk
      ↓
Cause Analysis
      ↓
Intervention Recommendation
      ↓
What-If Comparison
      ↓
Preventive Action
```

---

## ✨ Key Features

### 👤 Citizen

Citizens can:

- Create an account
- Log in securely
- Report waste
- Upload waste images
- Select waste categories
- Provide location information
- Add descriptions
- Track submitted reports

Public registration automatically creates:

```text
role = CITIZEN
```

Users cannot select their role during registration.

---

### 🏛️ Municipal Officer

Municipal officers can eventually:

- View citizen reports
- Analyze report patterns
- Monitor emerging hotspots
- View hotspot locations on a map
- Analyze severity
- Analyze waste categories
- Prioritize locations
- Plan interventions
- Use the What-If Simulator
- Track intervention outcomes

Municipal officers cannot publicly register.

Their accounts are created by an Admin.

---

### 👑 Admin

Admins manage municipal accounts.

Planned capabilities include:

- Create Municipal Officer accounts
- Activate/deactivate municipal accounts
- Assign municipal officers to municipalities/zones
- Manage municipal access

Admin functionality will be expanded in later development phases.

---

## 🔐 Authentication & Authorization

WasteWatch AI uses role-based authentication.

There are three roles:

```text
CITIZEN
MUNICIPAL_OFFICER
ADMIN
```

The user's role is determined by the backend.

The user does **not** select their role during registration.

### Citizen Registration

```text
Register
   ↓
FastAPI
   ↓
PostgreSQL
   ↓
role = CITIZEN
```

### Municipal Officer

```text
Admin
   ↓
Creates account
   ↓
role = MUNICIPAL_OFFICER
   ↓
Officer logs in
```

### Admin

```text
Admin Account
   ↓
role = ADMIN
```

---

## 🏗️ System Architecture

```text
                    WasteWatch AI
                         │
                         ▼
                  React + Vite
                         │
                     REST API
                         │
                         ▼
                      FastAPI
                         │
          ┌──────────────┼──────────────┐
          │              │              │
     Authentication    Reports      Analytics
          │              │              │
          └──────────────┼──────────────┘
                         │
                         ▼
                  PostgreSQL
                         │
                       PostGIS
                         │
                         ▼
                AI / Intelligence
                         │
             ┌───────────┼───────────┐
             │           │           │
           YOLO       XGBoost     Analytics
             │           │           │
             └───────────┼───────────┘
                         ▼
                  Hotspot Prediction
                         │
                         ▼
                Intervention Planning
                         │
                         ▼
                  What-If Simulator
```

---

## 🛠️ Technology Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Leaflet.js
- OpenStreetMap

### Backend

- Python
- FastAPI
- SQLAlchemy 2.x
- Alembic
- Pydantic
- JWT Authentication
- Password Hashing

### Database

- PostgreSQL
- PostGIS
- Neon PostgreSQL

### AI / Machine Learning

- YOLO
- OpenCV
- XGBoost
- scikit-learn
- Pandas
- NumPy

### Deployment

- Vercel — Frontend
- Render — Backend
- Neon — PostgreSQL

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- Swagger / OpenAPI

---

## 📂 Project Structure

```text
WasteWatch/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── data/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── alembic/
│   │   └── versions/
│   │
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── .env
│   └── .env.example
│
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .gitignore
└── README.md
```

---

## 🌐 Local Development

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://localhost:8000
```

### Swagger API Documentation

```text
http://localhost:8000/docs
```

### ReDoc API Documentation

```text
http://localhost:8000/redoc
```

### Health Check

```text
http://localhost:8000/api/health
```

---

# ⚙️ Environment Variables

## Frontend

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

For production:

```env
VITE_API_URL=https://YOUR-WASTEWATCH-BACKEND.onrender.com
```

Create `.env.example`:

```env
VITE_API_URL=http://localhost:8000
```

Never commit the real `.env` file.

---

## Backend

Create:

```text
backend/.env
```

Development configuration:

```env
DATABASE_URL=postgresql+psycopg://USERNAME:PASSWORD@HOST/DATABASE?sslmode=require

JWT_SECRET_KEY=YOUR_LONG_RANDOM_SECRET
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

ALLOWED_ORIGINS=["http://localhost:5173","http://127.0.0.1:5173"]
```

Production configuration:

```env
DATABASE_URL=YOUR_NEON_POSTGRES_CONNECTION_STRING

JWT_SECRET_KEY=YOUR_PRODUCTION_SECRET
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

ALLOWED_ORIGINS=["https://YOUR-WASTEWATCH-FRONTEND.vercel.app"]
```

Never commit:

```text
.env
```

or any file containing real credentials.

---

# 🗄️ Database Setup

WasteWatch AI uses PostgreSQL for persistent backend data.

The database can be hosted using Neon PostgreSQL.

The database connection is configured through:

```env
DATABASE_URL=
```

Example:

```env
DATABASE_URL=postgresql+psycopg://USERNAME:PASSWORD@HOST/DATABASE?sslmode=require
```

---

# 🧬 Database Migrations

WasteWatch AI uses Alembic for database migrations.

From the backend directory:

```bash
cd backend
```

Run existing migrations:

```bash
python -m alembic upgrade head
```

Create a new migration after modifying database models:

```bash
python -m alembic revision --autogenerate -m "description"
```

Apply the migration:

```bash
python -m alembic upgrade head
```

---

# 🐍 Backend Setup

From the project root:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure:

```text
backend/.env
```

Run migrations:

```bash
python -m alembic upgrade head
```

Start FastAPI:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend will be available at:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

---

# ⚛️ Frontend Setup

From the project root:

```bash
npm install
```

Create:

```text
.env
```

Add:

```env
VITE_API_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

Frontend will be available at:

```text
http://localhost:5173
```

---

# 🔑 Authentication API

## Health Check

```http
GET /api/health
```

---

## Citizen Registration

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "Test Citizen",
  "email": "citizen@example.com",
  "password": "TestPassword123!"
}
```

The backend automatically creates:

```text
role = CITIZEN
```

The frontend does not send or select a role.

---

## Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "citizen@example.com",
  "password": "TestPassword123!"
}
```

The backend authenticates the user and returns an access token.

The authenticated user's role is returned by the backend.

---

## Current User

```http
GET /api/auth/me
```

Requires:

```http
Authorization: Bearer <access_token>
```

Returns information about the authenticated user, including:

```text
id
name
email
role
is_active
```

---

# 👤 Citizen Flow

```text
Home
 ↓
Register
 ↓
Citizen Account
 ↓
Login
 ↓
Citizen Interface
 ↓
Report Waste
 ↓
Report Result
```

The current report prototype uses localStorage.

Migration of reports to PostgreSQL will be implemented as part of the backend data-layer phase.

---

# 🏛️ Municipal Officer Flow

```text
Admin
 ↓
Create Municipal Officer Account
 ↓
Municipal Officer
 ↓
Login
 ↓
Municipal Dashboard
 ↓
Reports
 ↓
Hotspots
 ↓
Interventions
 ↓
What-If Simulator
```

---

# 👑 Admin Flow

```text
Admin Login
 ↓
Admin Dashboard
 ↓
Manage Municipal Officers
 ↓
Create / Manage Accounts
```

Admin functionality will be expanded in future development phases.

---

# 📊 Current Municipal Intelligence

The current prototype includes:

- Citizen report aggregation
- Location-based report grouping
- Recent report analysis
- Severity breakdown
- Waste category breakdown
- Map visualization
- Simulated hotspot risk
- Hotspot details
- Intervention information
- What-If Simulator

> **Important:** The current hotspot risk layer is a deterministic simulated prototype. It should not be presented as a trained predictive ML model until the actual model is trained and evaluated.

---

# 🧠 AI & Prediction Pipeline

The planned AI pipeline is:

```text
Waste Image
     ↓
YOLO / OpenCV
     ↓
Visual Features
     ↓
Report Metadata
     +
Location
     +
Time
     +
Historical Reports
     ↓
Feature Engineering
     ↓
XGBoost
     ↓
Hotspot Risk
     ↓
Risk Explanation
     ↓
Intervention Recommendation
```

The system is designed to eventually learn from historical spatial-temporal patterns.

---

# 📍 Spatial Intelligence

WasteWatch AI uses location information to identify clusters of waste reports.

Planned spatial capabilities include:

- Location clustering
- Hotspot detection
- Spatial density
- Distance-based analysis
- Municipal zone analysis
- Historical hotspot patterns
- PostGIS spatial queries
- Map-based visualization

Leaflet and OpenStreetMap are used for map visualization.

---

# ⏱️ Temporal Intelligence

Waste patterns can change over time.

WasteWatch AI therefore considers:

- Number of reports
- Recent reports
- Historical activity
- Report frequency
- Severity trends
- Waste category trends
- Time-based patterns

This allows the system to move beyond simply counting complaints.

---

# 🔥 Hotspot Risk

The prototype calculates a simulated hotspot risk using available report information.

Risk categories currently include:

```text
80–100  → Emerging Hotspot

60–79   → Watch

40–59   → Moderate Activity

0–39    → Low Activity
```

These values are part of the current prototype and are not presented as validated real-world predictions.

---

# 🧪 What-If Intervention Simulator

One of WasteWatch AI's planned capabilities is the ability to compare possible interventions.

Example:

```text
Current Situation
       ↓
Hotspot Risk = Simulated Risk
       ↓
Try Intervention
       ↓
Additional Collection
       +
Cleaning
       +
Awareness Campaign
       ↓
Compare Scenario
```

The simulator is intended to help municipal teams explore possible intervention scenarios.

> Scenario outputs are simulated assumptions in the prototype. They should not be interpreted as guaranteed real-world outcomes.

In a future version, intervention effects can be learned from historical intervention and outcome data.

---

# 🗺️ Map-Based Dashboard

The municipal dashboard provides location-based visualization.

The planned dashboard includes:

- Waste report markers
- Hotspot markers
- Risk levels
- Location details
- Report counts
- Severity information
- Waste categories
- Recent activity
- Intervention status

---





# 🚀 Deployment

## Frontend — Vercel

Build the frontend:

```bash
npm run build
```

Deploy the project to Vercel.

Set the following environment variable:

```env
VITE_API_URL=https://YOUR-WASTEWATCH-BACKEND.onrender.com
```

After deployment, Vercel will provide a URL similar to:

```text
https://wastewatch-ai.vercel.app
```

Use the actual URL generated by Vercel.

---

## Backend — Render

Deploy the `backend` directory as a Python Web Service.

### Root Directory

```text
backend
```

### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Configure the following environment variables:

```env
DATABASE_URL=YOUR_NEON_DATABASE_URL

JWT_SECRET_KEY=YOUR_PRODUCTION_SECRET

JWT_ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

ALLOWED_ORIGINS=["https://YOUR-WASTEWATCH-FRONTEND.vercel.app"]
```

After deployment, Render will provide a URL similar to:

```text
https://wastewatch-backend.onrender.com
```

Use the actual Render URL in the Vercel `VITE_API_URL` environment variable.

---

# 🗄️ Production Database — Neon

Create a PostgreSQL database using Neon.

Configure the production backend with:

```env
DATABASE_URL=YOUR_NEON_DATABASE_URL
```

Run database migrations:

```bash
python -m alembic upgrade head
```

Never commit production database credentials to GitHub.

---

# 🔄 Production Architecture

```text
                         INTERNET
                            │
                            ▼
                   ┌─────────────────┐
                   │ Vercel Frontend │
                   │ React + Vite    │
                   └────────┬────────┘
                            │
                           HTTPS
                            │
                            ▼
                   ┌─────────────────┐
                   │ Render Backend  │
                   │ FastAPI         │
                   └────────┬────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │ Neon PostgreSQL │
                   │ + PostGIS       │
                   └────────┬────────┘
                            │
                            ▼
                    AI / ML Services
```

---

# 🔒 Security

WasteWatch AI follows these authentication principles:

- Passwords are never stored in plain text.
- Passwords are hashed before database storage.
- JWT authentication is used.
- User roles are determined by the backend.
- Public registration creates Citizen accounts only.
- Users cannot select their role during registration.
- Municipal accounts are created by Admin.
- Admin accounts are not publicly registered.
- Database credentials are stored in environment variables.
- JWT secrets are stored in environment variables.
- `.env` files must never be committed.
- Production CORS should only allow the deployed frontend domain.
- Frontend role information must never be treated as the source of authorization.
- Backend authorization remains the source of truth.

---

# 🧪 Testing

## Backend

Start the backend:

```bash
uvicorn app.main:app --reload --port 8000
```

Open Swagger:

```text
http://localhost:8000/docs
```

Test:

```text
GET  /api/health
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

---

## Frontend

Run the development server:

```bash
npm run dev
```

Build the production application:

```bash
npm run build
```

---

# 📱 Application Routes

## Public / Citizen

```text
/
 /login
 /register
 /report
 /report/result
```

## Municipal

```text
/dashboard
/hotspot/:id
/simulator
```

Authentication and authorization will determine which users can access protected routes as the system is completed.

---

# 🎯 Product Vision

WasteWatch AI aims to move waste management from:

```text
REACTIVE
   │
   ▼
Waste Accumulates
   │
   ▼
Citizen Reports
   │
   ▼
Municipality Responds
   │
   ▼
Cleanup
```

towards:

```text
PREVENTIVE
   │
   ▼
Citizen Reports
   │
   ▼
Detect Patterns
   │
   ▼
Predict Emerging Hotspots
   │
   ▼
Analyze Causes
   │
   ▼
Test Interventions
   │
   ▼
Prevent Escalation
```

---

# 🌱 Future Vision

Future versions of WasteWatch AI can incorporate:

- Real municipal datasets
- Historical intervention data
- Real-time waste detection
- Advanced geospatial analytics
- Predictive hotspot models
- Route optimization
- Municipal zone intelligence
- Intervention effectiveness analysis
- IoT / smart-bin data
- Automated alerts
- Advanced analytics dashboards

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Clone the repository:

```bash
git clone https://github.com/Aishwarya-Ramesh-Shetty/WasteWatch.git
```

Move into the project:

```bash
cd WasteWatch
```

Create a new branch:

```bash
git checkout -b feature/your-feature
```

Make your changes and commit:

```bash
git add .
git commit -m "Add your feature"
```

Push your branch:

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📄 License

This project is developed as part of the GeeksforGeeks Geeks2Code Open Innovation Hackathon.



# ♻️ WasteWatch AI

### Detect. Predict. Prevent.

> Turning waste reports into actionable intelligence for proactive waste management.
