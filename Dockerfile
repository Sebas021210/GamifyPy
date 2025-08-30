# Backend Dockerfile
FROM python:3.11-slim AS backend_build

# Directorio de trabajo
WORKDIR /app

# Copiar requisitos e instalar
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el backend
COPY backend/ ./backend

# Exponer puerto backend
EXPOSE 8000

# Comando para backend
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
