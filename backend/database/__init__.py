from backend.database.database import Database
from backend.database.schemas import Usuario, Categoria, Nivel, Leccion, Habilidad, LeccionHabilidad, Pregunta, ProgresoUsuario, IntentoPregunta, OpcionPregunta, Insignia, InsigniaUsuario

# Instancia de la base de datos PostgreSQL
db = Database()

__all__ = [
    "db",
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

def get_db():
    """Get the database session."""
    session = db.get_session()
    try:
        yield session
    finally:
        session.close()
