from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from backend.database import get_db, Usuario
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

SECRET_KEY = "clave_secreta_super_segura"
ALGORITHM = "HS256"
ph = PasswordHasher()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def hash_password(password: str) -> str:
    """ Hashea la contraseña con Argon2. """
    return ph.hash(password)

def verify_password(hashed_password: str, password: str) -> bool:
    """ Verifica una contraseña contra el hash. """
    try:
        ph.verify(hashed_password, password)
        return True
    except VerifyMismatchError:
        return False

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """ Crea un token JWT con los datos proporcionados y una fecha de expiración opcional. """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))

    print(f"This token will expire at: {expire}")

    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """ Obtiene el usuario actual a partir del token JWT proporcionado. """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            print("No email found in JWT payload")
            raise credentials_exception
    except JWTError as e:
        print(f"JWTError: {e}")
        raise credentials_exception

    user = db.query(Usuario).filter(Usuario.email == email).first()

    if user is None:
        print(f"User with email {email} not found")
        raise credentials_exception

    return user

def create_refresh_token(data: dict, expires_delta: timedelta | None = None):
    """ Crea un token de actualización JWT con los datos proporcionados y una fecha de expiración opcional. """
    to_encode = data.copy()
    expire = datetime.now() + (expires_delta or timedelta(days=7))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
