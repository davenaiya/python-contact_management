from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.controllers import contact_controller
from app.database.database import get_db
from app.schemas.contact import ContactCreate, ContactResponse, ContactUpdate

router = APIRouter(prefix="/contacts", tags=["Contacts"])


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def add_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    return contact_controller.create_contact(db, contact)


@router.get("", response_model=list[ContactResponse])
def list_contacts(search: str | None = Query(default=None), db: Session = Depends(get_db)):
    return contact_controller.get_contacts(db, search)


@router.get("/{contact_id}", response_model=ContactResponse)
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    return contact_controller.get_contact_by_id(db, contact_id)


@router.put("/{contact_id}", response_model=ContactResponse)
def edit_contact(contact_id: int, contact: ContactUpdate, db: Session = Depends(get_db)):
    return contact_controller.update_contact(db, contact_id, contact)


@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_contact(contact_id: int, db: Session = Depends(get_db)):
    contact_controller.delete_contact(db, contact_id)
