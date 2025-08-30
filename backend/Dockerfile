# Backend Dockerfile
FROM python:3.11-slim

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias e instalarlas
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código
COPY . .

# Ejecutar FastAPI con uvicorn (sin --reload en producción)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
