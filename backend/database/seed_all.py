"""
Carga todo el contenido de GamifyPy en una base de datos vacía.
Ejecutar desde la raíz del proyecto:  python -m backend.database.seed_all
"""
from backend.database.seed_data import seed
from backend.database.seed_lessons import insertar_lecciones
from backend.database.seed_exercises import preguntas_json
from backend.database.seed_skills import habilidades_json
from backend.database.seed_insignias import seed_insignias

from backend.database.database import Database
from sqlalchemy import text
import sys

TOTAL_NIVELES = 14
TABLAS_CONTENIDO = ["categoria", "niveles", "lecciones", "preguntas", "habilidades", "insignias"]

def verificar_base_vacia():
    """Muestra a qué base se conecta y aborta si ya tiene contenido (los IDs deben empezar en 1)."""
    engine = Database().engine
    print(f"🔌 Conectando a: {engine.url.host} / {engine.url.database}")
    with engine.connect() as conn:
        con_datos = [t for t in TABLAS_CONTENIDO if conn.execute(text(f"SELECT EXISTS (SELECT 1 FROM {t})")).scalar()]
    if con_datos:
        print(f"❌ La base de datos ya tiene contenido en: {', '.join(con_datos)}. No se hizo ningún cambio.")
        print("   seed_all solo debe correrse sobre una base vacía. Revisa DATABASE_URL en backend/.env.")
        sys.exit(1)

if __name__ == "__main__":
    verificar_base_vacia()
    # El orden importa: las preguntas y habilidades dependen de los IDs de las lecciones.
    seed()
    for nivel in range(1, TOTAL_NIVELES + 1):
        insertar_lecciones(f"Docs/Level{nivel}.md", nivel)
    for nivel in range(1, TOTAL_NIVELES + 1):
        preguntas_json(f"Content/Level{nivel}.json")
    habilidades_json("Content/Skills.json")
    seed_insignias()
    print("🎉 Base de datos lista.")
