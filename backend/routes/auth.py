from fastapi import APIRouter, Depends, HTTPException, Cookie, Body
from fastapi.responses import JSONResponse
from pydantic import EmailStr
from datetime import timedelta
from backend.database import get_db, Usuario
from sqlalchemy.orm import Session
from backend.controllers.auth import ( create_access_token, create_refresh_token, verify_password, hash_password, 
                                      send_verification_email, SECRET_KEY, ALGORITHM )
from backend.models.auth import LoginRequest, RegisterRequest, EmailRequest
from random import randint
import jwt

router = APIRouter()
verification_codes = {}

@router.post("/login")
async def login(login_request: LoginRequest, db=Depends(get_db)):
    """ Endpoint para iniciar sesión con usuario y contraseña. """
    user = db.query(Usuario).filter(Usuario.email == login_request.email).first()

    if not user or not user.password or not verify_password(user.password, login_request.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=15))
    refresh_token = create_refresh_token(data={"sub": user.email}, expires_delta=timedelta(days=7))

    response = JSONResponse(content={
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "nombre": user.nombre,
            "email": user.email,
            "id": user.id,
        }
    })

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False, # Set to True in production
        samesite="lax",
        max_age=7 * 24 * 60 * 60,
        path="/auth/refresh"
    )

    return response

@router.post("/register")
async def register(register_request: RegisterRequest, db=Depends(get_db)):
    """ Endpoint para registrar un nuevo usuario. """
    email = register_request.email

    if email in verification_codes:
        raise HTTPException(status_code=400, detail="Verifica tu PIN antes de registrarte.")

    existing_user = db.query(Usuario).filter(Usuario.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = Usuario(
        nombre=register_request.name,
        email=email,
        password=hash_password(register_request.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Usuario registrado correctamente",
        "email": email,
    }

@router.post("/send-pin")
async def send_pin(request: EmailRequest, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == request.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Este correo ya está registrado.")

    pin = str(randint(100000, 999999))
    verification_codes[request.email] = pin

    await send_verification_email(request.email, pin)

    return {"message": "PIN enviado al correo correctamente."}

@router.post("/verify-pin")
async def verify_pin(email: EmailStr = Body(...), pin: str = Body(...)):
    expected_pin = verification_codes.get(email)
    if not expected_pin:
        raise HTTPException(status_code=400, detail="No se encontró PIN para este correo.")
    if pin != expected_pin:
        raise HTTPException(status_code=400, detail="PIN incorrecto")

    del verification_codes[email]  # eliminar después de verificar

    return {"message": "Correo verificado exitosamente ✅"}

@router.post("/refresh")
async def refresh_token(refresh_token: str = Cookie(None), db = Depends(get_db)):
    """ Endpoint para refrescar el token de acceso usando el token de actualización. """
    print(f"Refresh token received: {refresh_token}")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Missing refresh token")

    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = db.query(Usuario).filter(Usuario.email == email).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        new_access_token = create_access_token(data={"sub": user.email})
        return {"access_token": new_access_token, "token_type": "bearer"}

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid refresh token. Error: {str(e)}")
