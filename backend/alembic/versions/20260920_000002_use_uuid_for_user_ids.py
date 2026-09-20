"""use uuid type for user ids

Revision ID: 20260920_000002
Revises: 20260920_000001
Create Date: 2026-09-20 00:00:02.000000
"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = '20260920_000002'
down_revision: Union[str, None] = '20260920_000001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        'users',
        'id',
        existing_type=sa.String(),
        type_=postgresql.UUID(as_uuid=False),
        postgresql_using='id::uuid',
    )


def downgrade() -> None:
    op.alter_column(
        'users',
        'id',
        existing_type=postgresql.UUID(as_uuid=False),
        type_=sa.String(),
        postgresql_using='id::text',
    )
