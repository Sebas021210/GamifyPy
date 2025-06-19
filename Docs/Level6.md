# 🏗️ Nivel 6 – Arquitecto del Arte

## Lección 1: ¿Qué es una función?
📌 Una función en Python siempre comienza con la palabra clave def, seguida del nombre que le das y unos paréntesis ().

```python
def saludar():
    print("Hola, artista de Python!")

saludar()  # Llamamos a la función para que se ejecute
```
🧠 Una función es una porción de código que tiene un nombre y puedes usarla muchas veces sin repetir el mismo código. Si no la llamas, no se ejecuta.

## Lección 2: Mi primera función de dibujo

```python
import turtle

def dibujar_cuadrado():
    for _ in range(4):
        turtle.forward(100)
        turtle.right(90)

dibujar_cuadrado()
```
📌 Las funciones ayudan a organizar mejor tu código y a evitar repetir instrucciones.

🧠 Cada vez que llamas dibujar_cuadrado(), se dibuja un nuevo cuadrado.

## Lección 3: Funciones con parámetros
📌 Los parámetros permiten que tus funciones sean más flexibles y puedas controlar su comportamiento desde afuera.

```python
def dibujar_poligono(lados, longitud):
    for _ in range(lados):
        turtle.forward(longitud)
        turtle.right(360 / lados)

dibujar_poligono(5, 80)  # Dibuja un pentágono
```
📌 Aquí, lados y longitud son parámetros. Cuando llamas a la función, les das un valor (eso se llama argumento).

🧠 Puedes combinar parámetros con otros comandos de Turtle, como colores:

```python
def figura_color(tamano, color):
    turtle.pencolor(color)
    for _ in range(4):
        turtle.forward(tamano)
        turtle.right(90)

figura_color(120, "orange")
```
📌 Esto te permite reutilizar una misma función pero con resultados diferentes. ¡Muy poderoso!

### Extra: ¿Qué es return?
📌 Algunas funciones devuelven un resultado con la palabra return. Sirve cuando necesitas usar el valor después.

```python
def sumar(a, b):
    return a + b

resultado = sumar(5, 3)
print("La suma es:", resultado)
```
🧠 En Turtle, return no se usa tanto para dibujos, pero es muy común en funciones matemáticas o de lógica.

## Lección 4: Modularidad en acción
📌 Puedes combinar funciones más pequeñas para crear cosas más complejas. Eso se llama modularidad.

```python
def petalo():
    for _ in range(2):
        turtle.circle(100, 60)
        turtle.left(120)

def flor():
    for _ in range(6):
        petalo() # Llamamos a la función 'petalo' dentro de otra función para repetir su dibujo
        turtle.right(60)

flor()
```
🧠 Cada función hace una sola cosa. Al juntarlas, creamos una flor completa.

## Lección 5: Mini proyecto guiado – Estrella de colores

📌 Copia y pega este código en tu editor y ejecútalo para ver cómo se dibuja la casa simple.

```python
def estrella(lado, color):
    turtle.pencolor(color)
    for _ in range(5):
        turtle.forward(lado)
        turtle.right(144)

estrella(100, "blue")
turtle.penup()
turtle.goto(150, 0)
turtle.pendown()
estrella(80, "red")
```
📌 Usamos funciones con parámetros y además movemos la tortuga (penup, goto, pendown) para dibujar en distintas partes.

🧠 Aquí aplicamos:
- Funciones reutilizables
- Parámetros de entrada
- Posicionamiento
- Creatividad

### Bonus Lección: Buenas prácticas con funciones
Reglas y consejos al usar funciones:
- Usa nombres descriptivos (por ejemplo, dibujar_estrella, no d1)
- No te olvides de llamar a la función o no pasará nada
- Usa return si necesitas que la función devuelva un valor
- Divide problemas grandes en funciones pequeñas (modularidad)
