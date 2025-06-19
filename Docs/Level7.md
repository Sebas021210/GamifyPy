# 🧙 Nivel 7 – Mago de Módulos

## Lección 1: ¿Qué es un módulo?
Un módulo es como un cofre lleno de herramientas que puedes usar en tu programa sin tener que construirlas desde cero.

```python
import math
print(math.sqrt(25))  # imprime 5.0
```
math es un módulo que ya viene con Python. Nos da funciones matemáticas listas para usar.

Beneficios:
- Reutilizas código sin escribirlo tú
- Organizas mejor tus proyectos

## Lección 2: Jugando con el azar (random)
El módulo random te permite trabajar con aleatoriedad.

```python
import random
print(random.randint(1, 10))  # número aleatorio del 1 al 10

colores = ["rojo", "verde", "azul"]
print(random.choice(colores))  # elige un color al azar
```

## Lección 3: Matemagia con math
math ofrece funciones matemáticas avanzadas.

```python
import math
print(math.sqrt(49))     # raíz cuadrada
print(math.pow(2, 3))     # 2 elevado a 3
print(math.pi)            # constante π
```

También puedes usar:
- math.floor(x) → redondea hacia abajo
- math.ceil(x) → redondea hacia arriba
- math.sin(x) → seno de un ángulo

Importa solo lo que necesitas:
```python
from math import sqrt, pi
print(sqrt(36))
print(pi)
```

## Lección 4: Creando mi propio módulo
Tú también puedes crear tus propios módulos

Un módulo es solo un archivo .py con funciones que luego puedes importar.

1.	Crea un archivo llamado figuras.py:

```python
# figuras.py
def estrella(tamano):
    import turtle
    for _ in range(5):
        turtle.forward(tamano)
        turtle.right(144)
```

2.	Luego lo usas desde otro archivo:

```python
import figuras
figuras.estrella(100)
```

🧠 Puedes organizar tu código por módulos y reutilizarlo.

Buenas prácticas al crear módulos:
- Nómbralos con minúsculas (utilidades.py, juego.py)
- Agrupa funciones que tienen un propósito común
- Usa import para reutilizar funciones donde quieras

## Lección 5: Proyecto mágico
Juego: Dibujar una figura aleatoria con un color aleatorio

```python
import turtle
import random
def cuadrado(tam):
    for _ in range(4):
        turtle.forward(tam)
        turtle.right(90)

def triangulo(tam):
    for _ in range(3):
        turtle.forward(tam)
        turtle.right(120)

figuras = [cuadrado, triangulo]
colores = ["red", "blue", "green"]

random.choice(figuras)(100)
turtle.pencolor(random.choice(colores))
```

Aquí aplicamos:
- Funciones
- Aleatoriedad
- Modularidad

Python tiene miles de módulos útiles: datetime, time, os, json, turtle, etc.

Puedes explorarlos e incluso instalarlos con pip.
```bash
pip install nombre_del_modulo
```
