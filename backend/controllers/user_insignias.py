from backend.database import (
    ProgresoUsuario, IntentoPregunta, InsigniaUsuario, 
    Nivel, Categoria, Leccion, Insignia, Pregunta
)
from datetime import datetime

def assign_insignia(user_id, insignia_id, db):
    """ Asigna una insignia a un usuario. """
    insignia_obtenida = db.query(InsigniaUsuario).filter_by(
        id_usuario=user_id, id_insignia=insignia_id
    ).first()

    if not insignia_obtenida:
        nueva_insignia = InsigniaUsuario(
            id_usuario=user_id,
            id_insignia=insignia_id,
            fecha_obtenida=datetime.now()
        )
        db.add(nueva_insignia)
        db.commit()

def evaluate_level_completion(user_id, db):
    """ Evalúa si un usuario ha completado un nivel y asigna una insignia. """
    ids_insignias = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14}
    niveles = db.query(Nivel).all()

    for nivel in niveles:
        lecciones = db.query(Leccion).filter_by(id_nivel=nivel.id).all()
        preguntas = db.query(Pregunta).filter(Pregunta.id_leccion.in_([l.id for l in lecciones])).all()

        completadas = db.query(ProgresoUsuario).filter(
            ProgresoUsuario.id_usuario == user_id,
            ProgresoUsuario.id_leccion.in_([l.id for l in lecciones]),
            ProgresoUsuario.completado == True
        ).count()

        preguntas_completadas = db.query(IntentoPregunta).filter(
            IntentoPregunta.id_usuario == user_id,
            IntentoPregunta.id_preguntas.in_([p.id for p in preguntas]),
            IntentoPregunta.es_correcto == True
        ).distinct(IntentoPregunta.id_preguntas).count()

        if completadas == len(lecciones) and preguntas_completadas == len(preguntas) and len(lecciones) > 0:
            insignia_id = ids_insignias.get(nivel.id)
            if insignia_id:
                assign_insignia(user_id, insignia_id, db)

def evaluate_category_completion(user_id, db):
    """ Evalúa si un usuario ha completado una categoría y asigna una insignia. """
    ids_insignias = {1: 48, 2: 49, 3: 50, 4: 51}
    niveles_categoria = {1: [1, 2], 2: [3, 4], 3: [5, 6, 7], 4: [8, 9, 10]}
    ids_insignias_niveles = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10}

    insignias_usuario = db.query(InsigniaUsuario.id_insignia).filter_by(id_usuario=user_id).all()
    insignias_usuario = set([i[0] for i in insignias_usuario])

    for categoria_id, niveles in niveles_categoria.items():
        insignias_necesarias = {ids_insignias_niveles[nivel] for nivel in niveles}

        if insignias_necesarias.issubset(insignias_usuario):
            insignia_categoria_id = ids_insignias.get(categoria_id)
            if insignia_categoria_id and insignia_categoria_id not in insignias_usuario:
                assign_insignia(user_id, insignia_categoria_id, db)

def evaluate_question_progress(user_id, db):
    """ Evalúa el progreso de las preguntas respondidas por un usuario. """
    ids_insignias_sin_errores = {1: 15, 2: 16, 3: 17, 4: 18, 5: 19, 6: 20, 7: 21, 8: 22, 9: 23, 10: 24, 11: 25, 12: 26, 13: 27, 14: 28}
    ids_insignias_cinco_errores = {1: 29, 2: 30, 3: 31, 4: 32, 5: 33, 6: 34, 7: 35, 8: 36, 9: 37, 10: 38, 11: 39, 12: 40, 13: 41, 14: 42}

    niveles = db.query(Nivel).all()

    for nivel in niveles:
        lecciones = db.query(Leccion).filter_by(id_nivel=nivel.id).all()
        preguntas = db.query(Pregunta).filter(Pregunta.id_leccion.in_([l.id for l in lecciones])).all()
        errores_preguntas = {}

        for pregunta in preguntas:
            intentos = db.query(IntentoPregunta).filter(
                IntentoPregunta.id_usuario == user_id,
                IntentoPregunta.id_preguntas == pregunta.id
            ).all()

            errores = sum(1 for intento in intentos if not intento.es_correcto)
            errores_preguntas[pregunta.id] = errores

        if preguntas:
            total_errores = sum(errores_preguntas.values())

            if total_errores == 0:
                insignia_id = ids_insignias_sin_errores.get(nivel.id)
                if insignia_id:
                    assign_insignia(user_id, insignia_id, db)
            elif total_errores <= 5:
                insignia_id = ids_insignias_cinco_errores.get(nivel.id)
                if insignia_id:
                    assign_insignia(user_id, insignia_id, db)


    