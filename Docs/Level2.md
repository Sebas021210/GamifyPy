# 🛡️ Nivel 2: Guardián de la Lógica

## ✅ Lección 1: ¿Qué es un valor booleano?

### 🎯 Objetivo:
Comprender qué son los valores booleanos y cómo se usan para tomar decisiones en programación.

---

### 🧠 Concepto clave
Un valor booleano representa solo dos estados posibles:
- True (Verdadero)
- False (Falso)

Son fundamentales para que un programa pueda tomar decisiones.

```python
es_estudiante = True
termino_tarea = False
```

### 🔍 Ejemplos en código
```python
print(10 > 5)      # True
print(3 == 4)      # False
print("Ana" != "Ana")  # False
```

### 🔄 Uso práctico
Puedes guardar resultados booleanos en variables:
```python
mayor = 8 > 3
print(mayor)   # True
```

## ✅ Lección 2: Comparaciones entre valores

### 📌 Objetivo: 
Comprender cómo comparar datos usando operadores relacionales.

---

Los operadores de comparación permiten verificar relaciones entre valores. El resultado siempre es True o False.

| Operador | Significado        | Ejemplo   | Resultado |
|----------|--------------------|-----------|-----------|
| `==`     | Igual a            | 5 == 5    | True      |
| `!=`     | Diferente de       | 4 != 3    | True      |
| `<`      | Menor que          | 3 < 5     | True      |
| `>`      | Mayor que          | 10 > 20   | False     |
| `<=`     | Menor o igual que  | 5 <= 5    | True      |
| `>=`     | Mayor o igual que  | 6 >= 7    | False     |

## ✅ Lección 3: Conectores lógicos: and / or

## 📌 Objetivo: 
Combinar varias condiciones para evaluar expresiones compuestas.

---

Los conectores lógicos permiten evaluar múltiples condiciones al mismo tiempo.

| Operador | Significado            | Ejemplo                  | Resultado |
|----------|------------------------|--------------------------|-----------|
| `and`    | Todas deben ser True   | 5 > 3 and 4 < 10         | True      |
| `or`     | Al menos una True      | 7 < 2 or 9 > 1           | True      |

### 🔍 Ejemplos en código
```python
edad = 20
tiene_carnet = True
print(edad >= 18 and tiene_carnet)  # True
```

## ✅ Lección 4: Negación lógica con not

### 📌 Objetivo: 
Usar not para invertir valores booleanos.

---

not invierte el valor lógico de una condición:
```python
es_estudiante = False
print(not es_estudiante)  # True
```

También puede combinarse:
```python
edad = 16
print(not edad >= 18)  # True
```
