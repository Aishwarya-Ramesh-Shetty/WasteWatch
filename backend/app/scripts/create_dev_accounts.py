import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.db.database import SessionLocal
from app.db.models import User

load_dotenv(Path(__file__).resolve().parents[2] / '.env')


def create_account(email: str, password: str, name: str, role: str) -> None:
    db: Session = SessionLocal()
    try:
        existing = db.query(User).filter(User.email == email.lower()).first()
        if existing:
            if existing.role != role or not existing.is_active:
                existing.role = role
                existing.is_active = True
                db.commit()
                print(f'Updated {role}: {email}')
                return
            print(f'User already exists: {email}')
            return

        user = User(
            name=name,
            email=email.lower(),
            password_hash=hash_password(password),
            role=role,
            is_active=True,
        )
        db.add(user)
        db.commit()
        print(f'Created {role}: {email}')
    finally:
        db.close()


def main() -> None:
    admin_email = os.getenv('ADMIN_EMAIL')
    admin_password = os.getenv('ADMIN_PASSWORD')
    municipal_email = os.getenv('MUNICIPAL_TEST_EMAIL')
    municipal_password = os.getenv('MUNICIPAL_TEST_PASSWORD')

    if admin_email and admin_password:
        create_account(admin_email, admin_password, 'System Admin', 'ADMIN')

    if municipal_email and municipal_password:
        create_account(municipal_email, municipal_password, 'Municipal Officer', 'MUNICIPAL_OFFICER')


if __name__ == '__main__':
    main()
