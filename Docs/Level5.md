# 🎨 Nivel 5 – Aprendiz del Dibujo

## ⚙️ Lección 0: Instalando turtle

### 🐍 ¿Qué es turtle?
turtle es un módulo incluido por defecto en la mayoría de las instalaciones de Python estándar. Sin embargo, hay entornos donde podrías necesitar configurarlo para que funcione correctamente.

---

### 💻 En consola (Windows, macOS, Linux):
Normalmente, si tienes Python instalado correctamente desde python.org, no necesitas instalar nada. Solo asegúrate de ejecutar tus programas en un entorno gráfico.

```bash
# No se necesita instalación, pero si ves errores, puedes reinstalar Python desde:
# https://www.python.org/downloads/
```

### 🧑‍💻 En Thonny:
1. Abre Thonny.
2. Ve al menú: Herramientas → Configuración del intérprete.
3. Asegúrate de estar usando Python con soporte gráfico.
4. No es necesario instalar turtle manualmente si estás en el entorno correcto.

## 🐢 Lección 1: Conociendo a Turtle

### 🧠 Idea clave:
turtle es un módulo que permite dibujar con una tortuga que se mueve en pantalla.

---

```python
import turtle
t = turtle.Turtle()  # Crea una nueva tortuga llamada 't'
t.forward(100)  # la tortuga avanza 100 unidades
```

### 🧠 Conceptos clave:
- forward(x): avanza x pasos
- backward(x): retrocede
- left(90) y right(90): gira en ese ángulo

## 🟩 Lección 2: Dibujar líneas y formas

```python
import turtle
t = turtle.Turtle()
for _ in range(4):
    t.forward(100)
    t.right(90)
```
🧠 Esto dibuja un cuadrado. Puedes hacer triángulos, hexágonos, etc.

## 🎨 Lección 3: Cambiar color de trazo

```python
t.pencolor("blue")
t.pensize(3)
```
📌 Usa pencolor() para cambiar el color del trazo y pensize() para ajustar su grosor.

🧠 Puedes usar colores por nombre ("red", "green", etc.) o códigos hexadecimales.

## 🖌️ Lección 4: Rellenar figuras

```python
t.fillcolor("yellow")
t.begin_fill()
for _ in range(3):
    t.forward(100)
    t.left(120)
t.end_fill()
```
📌 Usa fillcolor() para definir el color de relleno, begin_fill() para empezar a rellenar la figura que dibujes, y end_fill() para terminar el relleno.

🧠 Esto dibuja un triángulo relleno. El color de relleno puede ser distinto al del borde.

## 🧑‍🎨 Lección 5: Dibujo libre guiado

### 🔍 Ejemplos en código
Casa simple con cuadrado y triángulo encima.

📌 Copia y pega este código en tu editor y ejecútalo para ver cómo se dibuja la casa simple.

```python
# Cuadrado (base)
t.fillcolor("orange")
t.begin_fill()
for _ in range(4):
    t.forward(100)
    t.right(90)
t.end_fill()

# Techo (triángulo)
t.fillcolor("brown")
t.begin_fill()
t.forward(100)
t.left(135)
t.forward(70)
t.left(90)
t.forward(70)
t.end_fill()
```
