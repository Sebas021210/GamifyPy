# 🛠️ Nivel 3 – Maestro de Decisiones

## ✅ Lección 1: Tomando decisiones con if

### 🧠 Idea clave:
Ejecuta algo solo si se cumple una condición.

---

```python
edad = 20
if edad >= 18:
    print("Eres mayor de edad")
```
📌 if evalúa si la condición es True. Si no, el bloque se omite.

## ✅ Lección 2: ¿Y si no se cumple? else

### 🧠 Idea clave:
Usa else para manejar el caso cuando la condición no se cumple.

---

```python
if edad >= 18:
    print("Eres mayor de edad")
else:
    print("Eres menor de edad")
```
📌 Solo uno de los dos bloques se ejecuta.

## ✅ Lección 3: Más caminos con elif

### 🧠 Idea clave:
Usa elif cuando hay más de dos opciones.

---

```python
nota = 85
if nota >= 90:
    print("Excelente")
elif nota >= 70:
    print("Bien")
else:
    print("Necesitas mejorar")
```
📌 Se evalúan en orden. Solo un bloque se ejecuta.

## ✅ Lección 4: Condicionales anidadas

### 🧠 Idea clave:
Puedes poner un if dentro de otro para evaluar condiciones más complejas.

---

```python
edad = 18
tiene_id = True

if edad >= 18:
    if tiene_id:
        print("Puedes entrar")
    else:
        print("Trae tu identificación")
```
📌 Cuidado con la sangría y la complejidad.

## ✅ Lección 5: Buenas prácticas

### 🧠 Consejos clave:
- Usa sangría correcta (4 espacios).
- Evita anidaciones profundas innecesarias.
- Pon las condiciones más probables primero.
- Comenta si la lógica es complicada.

---

```python
if usuario == "admin":
    print("Acceso total")
elif usuario == "invitado":
    print("Acceso limitado")
else:
    print("Acceso denegado")
```

## ✅ Lección 6: Errores comunes y depuración

### Errores frecuentes:
❌ Olvidar los dos puntos : en el if

❌ No usar sangría

❌ Condiciones imposibles (ej: if x > 10 and x < 5)

❌ Orden incorrecto de if y elif

---

```python
x = 5
if x > 10:
    print("Muy grande")
elif x > 3:
    print("Tamaño medio")
else:
    print("Pequeño")
```
