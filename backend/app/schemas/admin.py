from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class MunicipalOfficerCreate(BaseModel):
    model_config = ConfigDict(extra='forbid')

    name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=8)

    @field_validator('name')
    @classmethod
    def validate_name(cls, value: str) -> str:
        if not value.strip():
            raise ValueError('Name is required.')
        return value.strip()


class MunicipalOfficerOut(BaseModel):
    id: str
    name: str
    email: str
    role: str
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)