from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.db.database import get_db
from app.db.models import User
from app.schemas.admin import MunicipalOfficerCreate, MunicipalOfficerOut
from app.services.auth_service import create_user, ensure_role, get_current_user, get_user_by_email

router = APIRouter(prefix='/api/admin', tags=['admin'])


@router.post('/municipal-officers', response_model=MunicipalOfficerOut, status_code=status.HTTP_201_CREATED)
def create_municipal_officer(
    payload: MunicipalOfficerCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    ensure_role(current_user, {'ADMIN'})

    normalized_email = payload.email.lower().strip()
    if get_user_by_email(db, normalized_email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email already registered')

    return create_user(
        db,
        name=payload.name,
        email=normalized_email,
        password_hash=hash_password(payload.password),
        role='MUNICIPAL_OFFICER',
    )


@router.get('/municipal-officers', response_model=list[MunicipalOfficerOut])
def list_municipal_officers(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    ensure_role(current_user, {'ADMIN'})
    return (
        db.query(User)
        .filter(User.role == 'MUNICIPAL_OFFICER')
        .order_by(User.created_at.desc())
        .all()
    )