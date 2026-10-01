# Contact Management System

A simple full-stack Contact Management System for an interview practical round. It lets users add, view, edit, delete, and search contacts.

## Technologies

- Frontend: React.js with Vite and Axios
- Backend: Python FastAPI
- Database: MySQL with SQLAlchemy
- API: REST API

## Folder structure

```text
contact management system/
├── backend/       # FastAPI application
├── frontend/      # React application
├── database/      # MySQL setup script
└── README.md
```

## MySQL setup

1. Ensure MySQL is running.
2. Run `database/setup.sql` in MySQL Workbench or the MySQL command line.
3. In `backend`, copy `.env.example` to a new file named `.env`.
4. Update the password in `.env`:

```env
DATABASE_URL=mysql+pymysql://root:your_password@localhost:3306/contact_manager
```

If the password contains special characters, URL-encode them.

## Run the backend

```powershell
cd "C:\python\contact management system\backend"
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API runs at `http://127.0.0.1:8000`. Swagger documentation is at `http://127.0.0.1:8000/docs`.

## Run the frontend

Open a second terminal:

```powershell
cd "C:\python\contact management system\frontend"
npm install
npm run dev
```

Open the local URL shown by Vite, normally `http://localhost:5173`.

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/contacts` | Create a contact |
| GET | `/contacts` | List contacts |
| GET | `/contacts?search=john` | Search by name or email |
| GET | `/contacts/{id}` | Get one contact |
| PUT | `/contacts/{id}` | Update a contact |
| DELETE | `/contacts/{id}` | Delete a contact |

## Example contact JSON

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "address": "Mumbai"
}
```
