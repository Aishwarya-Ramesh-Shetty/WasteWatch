from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Report, User
from app.schemas.report import ReportCreate, ReportOut
from app.services.auth_service import ensure_role, get_current_user

router = APIRouter(prefix='/api/reports', tags=['reports'])


@router.post('', response_model=ReportOut, status_code=status.HTTP_201_CREATED)
def create_report(
    payload: ReportCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    ensure_role(current_user, {'CITIZEN'})
    report = Report(user_id=current_user.id, **payload.model_dump())
    db.add(report)
    db.commit()
    db.refresh(report)
    return report


@router.get('/me', response_model=list[ReportOut])
def list_my_reports(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    ensure_role(current_user, {'CITIZEN'})
    return (
        db.query(Report)
        .filter(Report.user_id == current_user.id)
        .order_by(Report.created_at.desc())
        .all()
    )


@router.get('', response_model=list[ReportOut])
def list_reports(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    ensure_role(current_user, {'MUNICIPAL_OFFICER', 'ADMIN'})
    return db.query(Report).order_by(Report.created_at.desc()).all()