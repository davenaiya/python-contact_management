from fastapi import HTTPException, status
from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session

from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate


def create_contact(db: Session, contact: ContactCreate):
    new_contact = Contact(**contact.model_dump())
    db.add(new_contact)
    try:
        db.commit()
        db.refresh(new_contact)
        return new_contact
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="A contact with this email already exists.")
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not save the contact.")


def get_contacts(db: Session, search: str | None = None):
    try:
        query = db.query(Contact)
        if search:
            search_text = f"%{search.strip()}%"
            query = query.filter(or_(Contact.name.ilike(search_text), Contact.email.ilike(search_text), Contact.phone.ilike(search_text)))
        return query.order_by(Contact.id.desc()).all()
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Could not load contacts.")


def get_contact_by_id(db: Session, contact_id: int):
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found.")
    return contact


def update_contact(db: Session, contact_id: int, contact_data: ContactUpdate):
    contact = get_contact_by_id(db, contact_id)
    for field, value in contact_data.model_dump().items():
        setattr(contact, field, value)
    try:
        db.commit()
        db.refresh(contact)
        return contact
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="A contact with this email already exists.")
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not update the contact.")


def delete_contact(db: Session, contact_id: int):
    contact = get_contact_by_id(db, contact_id)
    try:
        db.delete(contact)
        db.commit()
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not delete the contact.")
