import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, BookOpen, Code, CheckCircle } from 'lucide-react';
import LessonsDialog from './LessonsDialog';
import ExerciseDialog from './ExcerciseDialog';
import './LevelContent.css';

const LevelContent = () => {
    const [leccionesExpanded, setLeccionesExpanded] = useState(false);
    const [ejerciciosExpanded, setEjerciciosExpanded] = useState(false);
    const [openLessonsDialog, setOpenLessonsDialog] = useState(false);
    const [leccionSeleccionada, setLeccionSeleccionada] = useState(null);
    const [openExcerciseDialog, setOpenExcerciseDialog] = useState(false);
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);

    const handleOpenLessonsDialog = () => {
        setOpenLessonsDialog(true);
    }

    const handleCloseLessonsDialog = () => {
        setOpenLessonsDialog(false);
    }

    const handleOpenExcerciseDialog = () => {
        setOpenExcerciseDialog(true);
    }

    const handleCloseExcerciseDialog = () => {
        setOpenExcerciseDialog(false);
    }

    const nivelData = {
        id: 1,
        nombre: "Fundamentos de Python",
        descripcion: "Aprende los conceptos básicos de programación en Python. Desde variables y tipos de datos hasta estructuras de control básicas.",
        progreso: 45,
        lecciones: [
            { id: 1, nombre: "¿Qué es Python?", completado: true },
            { id: 2, nombre: "Tu primer programa", completado: true },
            { id: 3, nombre: "Variables y tipos de datos", completado: true },
            { id: 4, nombre: "Operadores básicos", completado: false },
            { id: 5, nombre: "Entrada y salida de datos", completado: false }
        ],
        ejercicios: [
            {
                id: 1,
                nombre: "Hola Mundo",
                completado: true,
                tipo: "codigo",
                puntos: 10,
                texto: "Escribe un programa que imprima 'Hola, Mundo!' en la consola.",
                codigo_inicial: "",
                respuesta: "print('Hola, Mundo!')"
            },
            {
                id: 2,
                nombre: "Variables simples",
                completado: true,
                tipo: "opcion_multiple",
                puntos: 15,
                texto: "¿Cuál de las siguientes opciones es un nombre válido para una variable en Python?",
                respuesta: "nombre_usuario",
                opciones: [
                    { texto: "1numero", correcta: false },
                    { texto: "nombre_usuario", correcta: true },
                    { texto: "print", correcta: false },
                    { texto: "class", correcta: false }
                ]
            },
            {
                id: 3,
                nombre: "Operaciones matemáticas",
                completado: true,
                tipo: "codigo",
                puntos: 20,
                texto: "Crea dos variables con números y realiza las operaciones básicas (suma, resta, multiplicación, división).",
                codigo_inicial: "a = 10\nb = 5\n\n# Completa las operaciones:\nsuma = __\nresta = __\nmultiplicacion = __\ndivision = __",
                respuesta: "a = 10\nb = 5\n\nsuma = a + b\nresta = a - b\nmultiplicacion = a * b\ndivision = a / b"
            },
            {
                id: 4,
                nombre: "Calculadora básica",
                completado: false,
                tipo: "codigo",
                puntos: 25,
                texto: "Crea una calculadora que solicite dos números al usuario y una operación, luego muestre el resultado.",
                codigo_inicial: "",
                respuesta: "num1 = float(input('Primer número: '))\nnum2 = float(input('Segundo número: '))\noperacion = input('Operación (+, -, , /): ')\n\nif operacion == '+':\n    resultado = num1 + num2\nelif operacion == '-':\n    resultado = num1 - num2\nelif operacion == '':\n    resultado = num1 * num2\nelif operacion == '/':\n    resultado = num1 / num2\n\nprint(f'Resultado: {resultado}')"
            },
            {
                id: 5,
                nombre: "Conversión de temperaturas",
                completado: false,
                tipo: "opcion_multiple",
                puntos: 15,
                texto: "¿Cuál es la fórmula correcta para convertir Celsius a Fahrenheit?",
                respuesta: "F = (C * 9/5) + 32",
                opciones: [
                    { texto: "F = C * 9/5", correcta: false },
                    { texto: "F = (C * 9/5) + 32", correcta: true },
                    { texto: "F = C + 32", correcta: false },
                    { texto: "F = (C + 32) * 9/5", correcta: false }
                ]
            },
        ]
    };

    const calculateProgress = (items) => {
        const completedItems = items.filter(item => item.completado).length;
        return Math.round((completedItems / items.length) * 100);
    };

    const leccionesProgress = calculateProgress(nivelData.lecciones);
    const ejerciciosProgress = calculateProgress(nivelData.ejercicios);

    return (
        <div className="level-container">
            <div className="level-max-width">

                {/* Sección de Lecciones */}
                <div className="level-section-container">
                    <div
                        className={`level-section-card level-lecciones-card ${leccionesExpanded ? 'expanded' : ''}`}
                    >
                        {/* Header de Lecciones */}
                        <div className="level-section-header" onClick={() => setLeccionesExpanded(!leccionesExpanded)}>
                            <div className="level-section-header-left">
                                <div className="level-section-icon level-lecciones-icon">
                                    <BookOpen size={32} color="white" />
                                </div>
                                <div>
                                    <h2 className="level-section-title">Lecciones</h2>
                                    <p className="level-section-subtitle">
                                        {nivelData.lecciones.length} lecciones disponibles
                                    </p>
                                    <div className="level-section-progress">
                                        <span className="level-progress-text-small level-lecciones-progress-text">
                                            {leccionesProgress}% completado
                                        </span>
                                        <span className="level-progress-text-tiny">
                                            {nivelData.lecciones.filter(l => l.completado).length} de {nivelData.lecciones.length} completadas
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="level-section-header-right">
                                {leccionesProgress === 100 && <CheckCircle size={24} color="#22c55e" />}
                                {leccionesExpanded ?
                                    <ChevronDown size={24} color="#9ca3af" /> :
                                    <ChevronRight size={24} color="#9ca3af" />
                                }
                            </div>
                        </div>

                        {/* Barra de progreso de lecciones */}
                        <div className="level-section-progress-bar">
                            <div className="level-section-progress-bar-inner">
                                <div
                                    className="level-lecciones-progress-bar-fill"
                                    style={{ width: `${leccionesProgress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Contenido expandible de lecciones */}
                        {leccionesExpanded && (
                            <div className="level-expanded-content">
                                <div className="level-expanded-content-inner">
                                    <div className="level-items-grid">
                                        {nivelData.lecciones.map((leccion, index) => (
                                            <div
                                                key={leccion.id}
                                                className={`level-item ${leccion.completado ? 'level-completed-leccion' : 'level-pending-leccion'}`}
                                                onClick={() => {
                                                    setLeccionSeleccionada(leccion);
                                                    handleOpenLessonsDialog();
                                                }}
                                            >
                                                <div className="level-item-content">
                                                    <div className="level-item-left">
                                                        <div className={`level-item-number ${leccion.completado ? 'level-completed-number' : 'level-pending-number-leccion'}`}>
                                                            {leccion.completado ? <CheckCircle size={16} /> : index + 1}
                                                        </div>
                                                        <div className="level-item-text-container">
                                                            <span className="level-item-name">{leccion.nombre}</span>
                                                            <div className="level-item-status">
                                                                {leccion.completado ? 'Completada' : 'Pendiente'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Play size={20} color="#9ca3af" className="level-play-icon" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <LessonsDialog
                    open={openLessonsDialog}
                    handleClose={handleCloseLessonsDialog}
                    leccion={leccionSeleccionada}
                />

                {/* Sección de Ejercicios */}
                <div className="level-section-container">
                    <div
                        className={`level-section-card level-ejercicios-card ${ejerciciosExpanded ? 'expanded' : ''}`}
                    >
                        {/* Header de Ejercicios */}
                        <div className="level-section-header" onClick={() => setEjerciciosExpanded(!ejerciciosExpanded)} >
                            <div className="level-section-header-left">
                                <div className="level-section-icon level-ejercicios-icon">
                                    <Code size={32} color="white" />
                                </div>
                                <div>
                                    <h2 className="level-section-title">Ejercicios</h2>
                                    <p className="level-section-subtitle">
                                        {nivelData.ejercicios.length} ejercicios de práctica
                                    </p>
                                    <div className="level-section-progress">
                                        <span className="level-progress-text-small level-ejercicios-progress-text">
                                            {ejerciciosProgress}% completado
                                        </span>
                                        <span className="level-progress-text-tiny">
                                            {nivelData.ejercicios.filter(e => e.completado).length} de {nivelData.ejercicios.length} completados
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="level-section-header-right">
                                {ejerciciosProgress === 100 && <CheckCircle size={24} color="#22c55e" />}
                                {ejerciciosExpanded ?
                                    <ChevronDown size={24} color="#9ca3af" /> :
                                    <ChevronRight size={24} color="#9ca3af" />
                                }
                            </div>
                        </div>

                        {/* Barra de progreso de ejercicios */}
                        <div className="level-section-progress-bar">
                            <div className="level-section-progress-bar-inner">
                                <div
                                    className="level-ejercicios-progress-bar-fill"
                                    style={{ width: `${ejerciciosProgress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Contenido expandible de ejercicios */}
                        {ejerciciosExpanded && (
                            <div className="level-expanded-content">
                                <div className="level-expanded-content-inner">
                                    <div className="level-exercise-grid">
                                        {nivelData.ejercicios.map((ejercicio, index) => (
                                            <div
                                                key={ejercicio.id}
                                                className={`level-item ${ejercicio.completado ? 'level-completed-ejercicio' : 'level-pending-ejercicio'}`}
                                                onClick={() => {
                                                    setEjercicioSeleccionado(ejercicio);
                                                    handleOpenExcerciseDialog();
                                                }}
                                            >
                                                <div className="level-item-content">
                                                    <div className="level-item-left">
                                                        <div className={`level-item-number ${ejercicio.completado ? 'level-completed-number' : 'level-pending-number-ejercicio'}`}>
                                                            {ejercicio.completado ? <CheckCircle size={16} /> : index + 1}
                                                        </div>
                                                        <div className="level-item-text-container">
                                                            <span className="level-item-name-small">{ejercicio.nombre}</span>
                                                            <div className="level-item-status">
                                                                {ejercicio.completado ? 'Completado' : 'Pendiente'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Play size={16} color="#9ca3af" className="level-play-icon" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <ExerciseDialog
                    open={openExcerciseDialog}
                    handleClose={handleCloseExcerciseDialog}
                    ejercicio={ejercicioSeleccionado}
                />

            </div>
        </div>
    );
};

export default LevelContent;
