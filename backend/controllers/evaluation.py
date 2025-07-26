from backend.database import Pregunta, OpcionPregunta
from sqlalchemy.orm import Session
from openai import AsyncOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def evaluate_multiple_choice(db: Session, pregunta: Pregunta, respuesta: str):
    """ Función para evaluar respuestas de opción múltiple. """
    opciones = db.query(OpcionPregunta).filter_by(id_preguntas=pregunta.id).all()
    correctas = [opcion.texto_opcion for opcion in opciones if opcion.valor_opcion]

    if respuesta in correctas:
        return True, "Correcto, seleccionaste la opción adecuada."
    else:
        return False, f"Incorrecto. La respuesta correcta era: {', '.join(correctas)}"

async def evaluate_code(pregunta: Pregunta, respuesta: str):
    """ Función para evaluar respuestas de tipo código utilizando OpenAI. """
    prompt = f""" Eres un experto en Python.

    Pregunta: {pregunta.pregunta}
    Respuesta del usuario: {respuesta}

    Evalúa si la respuesta cumple correctamente. Responde SIEMPRE en este formato exacto:
    Resultado: Correcto / Incorrecto
    Retroalimentación:
    [explicación útil para el estudiante]
    """

    completion = await client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=300,
    )

    feedback_raw = completion.choices[0].message.content.strip()

    resultado_line = next((line for line in feedback_raw.split("\n") if "Resultado:" in line), None)
    if resultado_line:
        resultado = resultado_line.lower().replace("resultado:", "").strip()
        is_correct = resultado == "correcto"
    else:
        is_correct = None

    feedback_lines = feedback_raw.split("Retroalimentación:", 1)
    feedback = feedback_lines[1].strip() if len(feedback_lines) > 1 else feedback_raw

    return is_correct, feedback
