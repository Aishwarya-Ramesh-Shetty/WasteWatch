from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import User
from app.schemas.auth import TokenResponse, UserCreate, UserLogin, UserOut
from app.services.auth_service import authenticate_user, create_token_for_user, create_user, get_current_user, get_user_by_email
from app.core.security import hash_password

router = APIRouter(prefix='/api/auth', tags=['auth'])


@router.get('/health')
def health_check():
    return {'status': 'ok'}


@router.post('/register', response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(payload: UserCreate, db: Session = Depends(get_db)):
    normalized_email = payload.email.lower().strip()
    existing_user = get_user_by_email(db, normalized_email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email already registered')

    user = create_user(
        db,
        name=payload.name.strip(),
        email=normalized_email,
        password_hash=hash_password(payload.password),
        role='CITIZEN',
    )

    return user


@router.post('/login', response_model=TokenResponse)
def login_user(payload: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, payload.email.lower().strip(), payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid email or password')

    access_token = create_token_for_user(user)
    return {
        'access_token': access_token,
        'token_type': 'bearer',
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'role': user.role,
            'is_active': user.is_active,
        },
    }


@router.get('/me', response_model=UserOut)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user
