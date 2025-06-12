# 🧩 Nivel 1 – Explorador de Variables

## ✅ Lección 1: ¿Qué es una variable?

### 🎯 Objetivo:
Aprender a declarar variables, nombrarlas correctamente y usarlas para guardar información.

---

### 🧠 ¿Qué es una variable?
Una variable es como una caja con una etiqueta: puedes guardar datos dentro, como texto, números o valores booleanos.

```python
edad = 18 # edad es la etiqueta, 18 es el valor
```

### 📌 Cómo crear variables
```python
nombre = "Lucía" # Crear una variable
```

---

### ✅ Reglas para nombrar variables
- Deben comenzar con letra o _
- Pueden tener letras, números y guiones bajos (_)
- ❌ No deben empezar con un número
- ❌ No pueden contener espacios o símbolos
- ❌ No uses nombres reservados de Python (como print, if, for)

```python
# Válidos
nombre_usuario = "Ana"
edad2 = 25

# Inválidos
2nombre = "Carlos"        # ❌
nombre usuario = "Luis"   # ❌
print = 10                # ❌
```

## ✅ Lección 2: Tipos de datos básicos

### 📌 Objetivo: 
Comprender los tipos básicos en Python: int, float, str, bool.

---

En Python, cada dato tiene un tipo. Los más comunes son:
```python
entero = 5             # int
decimal = 3.14         # float
texto = "Hola"         # str
logico = True          # bool
```

Podemos verificar su tipo con type():
```python
print(type(entero))  # <class 'int'>
```

También podemos convertir entre tipos:
```python
edad = "21"
edad_num = int(edad)   # convierte de str a int
```

## ✅ Lección 3: Operaciones aritméticas

### 📌 Objetivo: 
Usar operadores matemáticos básicos en Python.

---

Python soporta varias operaciones:
| Operador | Descripción         | Ejemplo        |
|----------|---------------------|----------------|
| `+`      | Suma                | `3 + 2`        |
| `-`      | Resta               | `5 - 1`        |
| `*`      | Multiplicación      | `2 * 3`        |
| `/`      | División flotante   | `5 / 2 = 2.5`  |
| `//`     | División entera     | `5 // 2 = 2`   |
| `%`      | Módulo (residuo)    | `5 % 2 = 1`    |
| `**`     | Potencia            | `2 ** 3 = 8`   |

## ✅ Lección 4: Imprimir y mostrar datos

### 📌 Objetivo: 
Aprender a mostrar información al usuario con print() y a combinar textos.

---

```python
print("Hola")  # Muestra un mensaje
```

Podemos concatenar textos:
```python
nombre = "Sebastián"
print("Hola " + nombre)
```

También usar f-strings (más recomendado):
```python
edad = 21
print(f"Tienes {edad} años")
```
