from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ReportCreate(BaseModel):
    location_name: str | None = Field(default=None, max_length=255)
    category: str = Field(..., min_length=1, max_length=100)
    severity: str = Field(..., min_length=1, max_length=50)
    description: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    image_reference: str | None = Field(default=None, max_length=2048)
    confidence: float | None = Field(default=None, ge=0, le=1)
    status: str = Field(default='Queued for review', min_length=1, max_length=100)
    ai_analysis: dict | None = None


class ReportOut(ReportCreate):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)