from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='.env',
        env_file_encoding='utf-8',
        case_sensitive=False,
    )

    APP_NAME: str = 'WasteWatch AI'
    DATABASE_URL: str = 'postgresql+psycopg://username:password@localhost:5432/wastewatch'
    JWT_SECRET_KEY: str = 'change-me-in-production'
    JWT_ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    FRONTEND_URL: str = 'http://localhost:5173'
    ALLOWED_ORIGINS: list[str] = ['http://localhost:5173']
    ADMIN_EMAIL: str | None = None
    ADMIN_PASSWORD: str | None = None
    MUNICIPAL_TEST_EMAIL: str | None = None
    MUNICIPAL_TEST_PASSWORD: str | None = None


@lru_cache
def get_settings() -> Settings:
    return Settings()
