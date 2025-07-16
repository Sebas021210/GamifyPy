from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.responses import JSONResponse
from backend.database import get_db, Pregunta, OpcionPregunta, Leccion, IntentoPregunta, Usuario
from sqlalchemy.orm import Session
from backend.controllers.auth import get_current_user
from backend.models.question import RespuestaRequest
from backend.controllers.evaluation import evaluate_multiple_choice, evaluate_code

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

@router.post("/{pregunta_id}/evaluar")
async def evaluate_question(
    pregunta_id: int,
    request: RespuestaRequest,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """ Endpoint para evaluar una respuesta a una pregunta. """
    respuesta = request.respuesta
    pregunta = db.query(Pregunta).filter_by(id=pregunta_id).first()
    if not pregunta:
        raise HTTPException(status_code=404, detail="Pregunta no encontrada")
    
    if pregunta.tipo == "opcion_multiple":
        es_correcto, retroalimentacion = evaluate_multiple_choice(db, pregunta, respuesta)
    elif pregunta.tipo == "codigo":
        try:
            es_correcto, retroalimentacion = await evaluate_code(pregunta, respuesta)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error al evaluar el código: {str(e)}")
    else:
        raise HTTPException(status_code=400, detail="Tipo de pregunta no soportado")
    
    intento = IntentoPregunta(
        id_usuario=current_user.id,
        id_preguntas=pregunta_id,
        respuesta_enviada=respuesta,
        es_correcto=es_correcto,
        retroalimentacion=retroalimentacion
    )
    db.add(intento)
    db.commit()

    return {
        "es_correcto": es_correcto,
        "retroalimentacion": retroalimentacion
    }
