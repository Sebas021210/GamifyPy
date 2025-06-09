from backend.database.database import Database
from backend.database.schemas import User

# Instancia de la base de datos PostgreSQL
db = Database()

__all__ = [
    "db",
    "get_db",
    "User",
]

def get_db():
    """Get the database session."""
    session = db.get_session()
    try:
        yield session
    finally:
        session.close()
