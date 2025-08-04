import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, BookOpen, Code, CheckCircle } from 'lucide-react';
import './LevelContent.css';

const LevelContent = () => {
    const [leccionesExpanded, setLeccionesExpanded] = useState(false);
    const [ejerciciosExpanded, setEjerciciosExpanded] = useState(false);

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
            { id: 1, nombre: "Hola Mundo", completado: true },
            { id: 2, nombre: "Variables simples", completado: true },
            { id: 3, nombre: "Operaciones matemáticas", completado: true },
            { id: 4, nombre: "Calculadora básica", completado: false },
            { id: 5, nombre: "Conversión de temperaturas", completado: false },
            { id: 6, nombre: "Área de figuras", completado: false },
            { id: 7, nombre: "Números pares e impares", completado: false },
            { id: 8, nombre: "Mayor de tres números", completado: false },
            { id: 9, nombre: "Tabla de multiplicar", completado: false },
            { id: 10, nombre: "Contador de vocales", completado: false },
            { id: 11, nombre: "Palíndromo", completado: false },
            { id: 12, nombre: "Proyecto: Mini juego", completado: false }
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
                                                onClick={() => console.log(`Click en la lección: ${leccion.nombre}`)}
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
                                                onClick={() => console.log(`Click en la lección: ${ejercicio.nombre}`)}
                                                key={ejercicio.id}
                                                className={`level-item ${ejercicio.completado ? 'level-completed-ejercicio' : 'level-pending-ejercicio'}`}
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
            </div>
        </div>
    );
};

export default LevelContent;
