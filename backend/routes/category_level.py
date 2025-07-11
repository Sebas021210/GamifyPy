from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from backend.database import get_db, Categoria, Nivel, Leccion
from sqlalchemy.orm import Session
from backend.controllers.auth import get_current_user

router = APIRouter()

@router.get("/categorias")
async def get_categories(db: Session = Depends(get_db)):
    categorias = db.query(Categoria).order_by(Categoria.id).all()
    categoria_data = [
        {
            "id": categoria.id,
            "nombre": categoria.nombre,
            "descripcion": categoria.descripcion,
        } for categoria in categorias
    ]

    return JSONResponse(content={"categorias": categoria_data})

@router.get("/categorias/{categoria_id}/niveles")
async def get_levels_by_category(categoria_id: int, db: Session = Depends(get_db)):
    niveles = (
        db.query(Nivel)
        .filter(Nivel.id_categoria == categoria_id)
        .order_by(Nivel.orden)
        .all()
    )

    if not niveles:
        raise HTTPException(status_code=404, detail="No levels found for this category")
    
    nivel_data = [
        {
            "id": nivel.id,
            "nombre": nivel.nombre,
            "descripcion": nivel.descripcion,
            "orden": nivel.orden,
        } for nivel in niveles
    ]

    return JSONResponse(content={"niveles": nivel_data})

@router.get("/niveles/{nivel_id}")
def get_level(nivel_id: int, db: Session = Depends(get_db)):
    nivel = db.query(Nivel).filter(Nivel.id == nivel_id).first()
    if not nivel:
        raise HTTPException(status_code=404, detail="Level not found")
    
    nivel_data = {
        "id": nivel.id,
        "nombre": nivel.nombre,
        "descripcion": nivel.descripcion,
        "orden": nivel.orden,
        "id_categoria": nivel.id_categoria,
    }

    return JSONResponse(content=nivel_data)

@router.get("/niveles/{nivel_id}/lecciones")
def get_lessons_by_level(nivel_id: int, db: Session = Depends(get_db)):
    lecciones = (
        db.query(Leccion)
        .filter(Leccion.id_nivel == nivel_id)
        .order_by(Leccion.orden)
        .all()
    )

    if not lecciones:
        raise HTTPException(status_code=404, detail="No lessons found for this level")
    
    leccion_data = [
        {
            "id": leccion.id,
            "titulo": leccion.titulo,
            "orden": leccion.orden,
        } for leccion in lecciones
    ]

    return JSONResponse(content={"lecciones": leccion_data})
