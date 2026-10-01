from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ContactBase(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(min_length=1, max_length=30)


class ContactCreate(ContactBase):
    address: str = Field(min_length=1, max_length=255)


class ContactUpdate(ContactBase):
    address: str = Field(min_length=1, max_length=255)


class ContactResponse(ContactBase):
    id: int
    # Older database rows may have no address. They can still be displayed and edited.
    address: str | None = None

    model_config = ConfigDict(from_attributes=True)
