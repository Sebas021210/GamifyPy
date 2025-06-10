from backend.database.database import Database
from backend.database.schemas import Categoria, Nivel

db = Database()
session = db.get_session()

def reset_data():
    """Elimina datos existentes de las tablas relacionadas."""
    print("🗑️ Eliminando datos previos...")
    session.query(Nivel).delete()
    session.query(Categoria).delete()
    session.commit()
    print("✅ Datos eliminados.")

def seed():
    reset_data()

    # Insertar categorías
    categorias = [
        Categoria(nombre="Principiante", descripcion="Fundamentos de programación y lógica básica en Python."),
        Categoria(nombre="Intermedio", descripcion="Condicionales y estructuras de control para la toma de decisiones y repetición."),
        Categoria(nombre="Avanzado", descripcion="Uso de funciones, módulos y programación visual con Turtle."),
        Categoria(nombre="Experto", descripcion="Estructuras de datos clave y manejo adecuado de errores en Python.")
    ]
    session.add_all(categorias)
    session.commit()

    # Insertar niveles
    niveles = [
        # Principiante
        Nivel(id_categoria=1, orden=1, nombre="Nivel 1: Explorador de Variables",
              descripcion="Aprende a declarar variables, utilizar distintos tipos de datos (int, float, str) y resolver operaciones aritméticas simples en Python."),
        Nivel(id_categoria=1, orden=2, nombre="Nivel 2: Guardián de la Lógica",
              descripcion="Desarrolla habilidades en lógica booleana usando operadores como ==, !=, <, >, and, or y not para tomar decisiones simples."),

        # Intermedio
        Nivel(id_categoria=2, orden=3, nombre="Nivel 3: Maestro de Decisiones",
              descripcion="Domina el uso de estructuras condicionales como if, elif y else para controlar el flujo de ejecución en tus programas."),
        Nivel(id_categoria=2, orden=4, nombre="Nivel 4: Domador de Bucles",
              descripcion="Utiliza ciclos for y while para repetir instrucciones. Controla la ejecución con break y continue según condiciones específicas."),

        # Avanzado
        Nivel(id_categoria=3, orden=5, nombre="Nivel 5: Aprendiz del Dibujo",
              descripcion="Explora la librería Turtle para crear gráficos: líneas, colores, rellenos y diseños básicos con instrucciones secuenciales."),
        Nivel(id_categoria=3, orden=6, nombre="Nivel 6: Arquitecto del Arte",
              descripcion="Crea tus propias funciones y organiza dibujos con Turtle en módulos estructurados. Aprende reutilización y modularidad."),
        Nivel(id_categoria=3, orden=7, nombre="Nivel 7: Mago de Módulos",
              descripcion="Importa módulos propios o de la librería estándar como math y random. Aprende a estructurar programas más grandes."),

        # Experto
        Nivel(id_categoria=4, orden=8, nombre="Nivel 8: Guardián de Listas y Cadenas",
              descripcion="Domina listas y cadenas en Python. Comprende mutabilidad e inmutabilidad, y aplica funciones como append, split, len y más."),
        Nivel(id_categoria=4, orden=9, nombre="Nivel 9: Maestro de Diccionarios",
              descripcion="Aprende a trabajar con diccionarios: almacenar pares clave-valor, acceder a datos y recorrer colecciones con for."),
        Nivel(id_categoria=4, orden=10, nombre="Nivel 10: Invocador de Errores",
              descripcion="Identifica y controla errores comunes usando try y except. Mejora la robustez de tus programas con buen manejo de excepciones.")
    ]
    session.add_all(niveles)
    session.commit()
    print("✅ Categorías y niveles insertados correctamente.")

if __name__ == "__main__":
    seed()
