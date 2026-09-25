"""
Carga todo el contenido de GamifyPy en una base de datos vacía.
Ejecutar desde la raíz del proyecto:  python -m backend.database.seed_all
"""
from backend.database.seed_data import seed
from backend.database.seed_lessons import insertar_lecciones
from backend.database.seed_exercises import preguntas_json
from backend.database.seed_skills import habilidades_json
from backend.database.seed_insignias import seed_insignias

TOTAL_NIVELES = 14

if __name__ == "__main__":
    # El orden importa: las preguntas y habilidades dependen de los IDs de las lecciones.
    seed()
    for nivel in range(1, TOTAL_NIVELES + 1):
        insertar_lecciones(f"Docs/Level{nivel}.md", nivel)
    for nivel in range(1, TOTAL_NIVELES + 1):
        preguntas_json(f"Content/Level{nivel}.json")
    habilidades_json("Content/Skills.json")
    seed_insignias()
    print("🎉 Base de datos lista.")
