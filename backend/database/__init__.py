from backend.database.database import Database
from backend.database.schemas import (
    Usuario, Categoria, Nivel, Leccion, Habilidad, LeccionHabilidad, Pregunta, ProgresoUsuario, 
    IntentoPregunta, OpcionPregunta, Insignia, InsigniaUsuario
)

_db = None

def get_db():
    """Get the database session."""
    # Se reutiliza una sola conexión (engine) en lugar de crear una nueva en cada petición.
    global _db
    if _db is None:
        _db = Database()
    session = _db.get_session()
    try:
        yield session
    finally:
        session.close()

__all__ = [
    "get_db",
    "Usuario",
    "Categoria",
    "Nivel",
    "Leccion",
    "Habilidad",
    "LeccionHabilidad",
    "Pregunta",
    "ProgresoUsuario",
    "IntentoPregunta",
    "OpcionPregunta",
    "Insignia",
    "InsigniaUsuario"
]
