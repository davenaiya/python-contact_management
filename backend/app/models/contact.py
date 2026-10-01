from sqlalchemy import Column, Integer, String

from app.database.database import Base


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    email = Column(String(150), nullable=False, unique=True, index=True)
    phone = Column(String(30), nullable=False)
    address = Column(String(255), nullable=True)
