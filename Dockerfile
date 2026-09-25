FROM python:3.11-slim

WORKDIR /app

COPY backend/ ./backend
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

# Render asigna el puerto en la variable PORT; en local se usa 8000.
CMD uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000} --proxy-headers --forwarded-allow-ips="*"
