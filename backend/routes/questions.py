from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from backend.database import get_db, Pregunta, OpcionPregunta, Leccion
from sqlalchemy.orm import Session
from backend.controllers.auth import get_current_user

router = APIRouter()

@router.get("/{nivel_id}/preguntas/opcion-multiple")
async def get_multiple_choice_questions(nivel_id: int, db: Session = Depends(get_db)):
    """ Endpoint para obtener preguntas de opción múltiple de un nivel específico. """
    preguntas = (
        db.query(Pregunta)
        .join(Leccion, Pregunta.id_leccion == Leccion.id)
        .filter(Leccion.id_nivel == nivel_id, Pregunta.tipo == "opcion_multiple")
        .all()
    )

    resultado = []
    for pregunta in preguntas:
        opciones = db.query(OpcionPregunta).filter(OpcionPregunta.id_preguntas == pregunta.id).all()
        resultado.append({
            "id": pregunta.id,
            "pregunta": pregunta.pregunta,
            "codigo_inicial": pregunta.codigo_inicial,
            "respuesta": pregunta.respuesta,
            "tipo": pregunta.tipo,
            "puntos": pregunta.puntos,
            "opciones": [
                {
                    "texto": opcion.texto_opcion,
                    "valor": opcion.valor_opcion,
                } for opcion in opciones
            ]
        })

    return JSONResponse(content={"preguntas": resultado})

@router.get("/{nivel_id}/preguntas/codigo")
async def get_code_questions(nivel_id: int, db: Session = Depends(get_db)):
    """ Endpoint para obtener preguntas de código de un nivel específico. """
    preguntas = (
        db.query(Pregunta)
        .join(Leccion, Pregunta.id_leccion == Leccion.id)
        .filter(Leccion.id_nivel == nivel_id, Pregunta.tipo == "codigo")
        .all()
    )

    resultado = [
        {
            "id": pregunta.id,
            "pregunta": pregunta.pregunta,
            "codigo_inicial": pregunta.codigo_inicial,
            "respuesta": pregunta.respuesta,
            "tipo": pregunta.tipo,
            "puntos": pregunta.puntos,
        } for pregunta in preguntas
    ]

    return JSONResponse(content={"preguntas": resultado})
