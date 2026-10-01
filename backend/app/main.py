from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.models.contact import Contact  # Imports the model before create_all runs.
from app.routers.contact_router import router as contact_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Contact Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact_router)


@app.get("/")
def home():
    return {"message": "Contact Management API is running."}
