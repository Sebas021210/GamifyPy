from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from backend.database import get_db, Insignia, Usuario
from sqlalchemy.orm import Session
from backend.controllers.auth import get_current_user
from backend.controllers.user_insignias import evaluate_level_completion, evaluate_category_completion, evaluate_question_progress

router = APIRouter()

@router.get("/")
async def get_insignias(db: Session = Depends(get_db)):
    """ Endpoint para obtener todas las insignias. """
    insignias = db.query(Insignia).all()
    insignias_list = [
        {
            "id": insignia.id,
            "nombre": insignia.nombre,
            "descripcion": insignia.descripcion,
            "icono": insignia.icono,
        } for insignia in insignias
    ]

    return JSONResponse(content={"insignias": insignias_list})

@router.post("/assign")
async def assign_insignia(current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    """ Endpoint para asignar una insignia a un usuario. """
    try:
        user_id = current_user.id
        evaluate_level_completion(user_id, db)
        evaluate_category_completion(user_id, db)
        evaluate_question_progress(user_id, db)

        return JSONResponse(content={"message": "Insignias evaluadas y asignadas correctamente."})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    