from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Tabla User
class User(Base):
    __tablename__ = 'user'

    id_pk = Column(Integer, primary_key=True, autoincrement=True)
    public_key = Column(String, nullable=False)
    correo = Column(String, nullable=False)
    password = Column(String, nullable=True)
    nombre = Column(String, nullable=False)
    hash = Column(String, nullable=True)
