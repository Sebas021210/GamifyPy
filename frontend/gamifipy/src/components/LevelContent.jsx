import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Play, BookOpen, Code, CheckCircle, Lock } from 'lucide-react';
import LessonsDialog from './LessonsDialog';
import ExerciseDialog from './ExcerciseDialog';
import './LevelContent.css';

const LevelContent = ({ id_nivel }) => {
    const [leccionesExpanded, setLeccionesExpanded] = useState(false);
    const [ejerciciosExpanded, setEjerciciosExpanded] = useState(false);
    const [openLessonsDialog, setOpenLessonsDialog] = useState(false);
    const [leccionSeleccionada, setLeccionSeleccionada] = useState(null);
    const [openExcerciseDialog, setOpenExcerciseDialog] = useState(false);
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
    const [lecciones, setLecciones] = useState([]);
    const [lessonsContent, setLessonsContent] = useState('');
    const [ejercicios, setEjercicios] = useState([]);

    {/* Funciones para el manejo de Dialog */ }
    const handleOpenLessonsDialog = async (leccion) => {
        try {
            const response = await fetch(`http://localhost:8000/lessons/${leccion.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            if (!response.ok) {
                throw new Error('Error fetching lesson content');
            }
            const data = await response.json();
            setLessonsContent(data);
            setOpenLessonsDialog(true);
        } catch (error) {
            console.error('Error fetching lesson content:', error);
        }
    }

    const handleCloseLessonsDialog = () => {
        setOpenLessonsDialog(false);
        setLeccionSeleccionada(null);
        setLessonsContent('');
    }

    const handleOpenExcerciseDialog = () => {
        setOpenExcerciseDialog(true);
    }

    const handleCloseExcerciseDialog = () => {
        setOpenExcerciseDialog(false);
    }

    {/* Funciones para logica de Lecciones */ }
    useEffect(() => {
        const getLecciones = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No token found");
                }

                const response = await fetch(`http://localhost:8000/category-level/${id_nivel}/lecciones`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (!response.ok) {
                    throw new Error('Error fetching lessons data');
                }
                const data = await response.json();
                console.log('Lecciones data:', data);
                setLecciones(data.lecciones);
            } catch (error) {
                console.error('Error fetching lessons data:', error);
            }
        }
        getLecciones();
    }, [id_nivel]);

    const updateLecciones = (leccionId) => {
        setLecciones((prevLecciones) => {
            const updatedLecciones = prevLecciones.map((leccion) => {
                if (leccion.id === leccionId) {
                    return { ...leccion, completada: true };
                }
                if (leccion.id === leccionId + 1) {
                    return { ...leccion, bloqueada: false };
                }
                return leccion;
            });

            if (leccionSeleccionada && leccionSeleccionada.id === leccionId) {
                setLeccionSeleccionada(prev => ({ ...prev, completada: true }));
            }

            return updatedLecciones;
        });
    };

    const handleNextLesson = async () => {
        const currentIndex = lecciones.findIndex(l => l.id === leccionSeleccionada.id);
        const nextIndex = currentIndex + 1;

        if (nextIndex < lecciones.length) {
            const nextLesson = lecciones[nextIndex];
            if (!nextLesson.bloqueada) {
                try {
                    const response = await fetch(`http://localhost:8000/lessons/${nextLesson.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Error fetching lesson content');
                    }
                    const data = await response.json();
                    setLessonsContent(data);
                    setLeccionSeleccionada(nextLesson);
                } catch (error) {
                    console.error('Error fetching next lesson content:', error);
                }
            }
        }
    };

    const hasNextLesson = () => {
        if (!leccionSeleccionada) return false;
        const currentIndex = lecciones.findIndex(l => l.id === leccionSeleccionada.id);
        const nextIndex = currentIndex + 1;
        return nextIndex < lecciones.length && !lecciones[nextIndex]?.bloqueada;
    };

    {/* Funciones para logica de Ejercicios */ }
    useEffect(() => {
        const getEjercicios = async () => {
            const [resOpciones, resCodigo] = await Promise.all([
                fetch(`http://localhost:8000/questions/${id_nivel}/preguntas/opcion-multiple`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }),
                fetch(`http://localhost:8000/questions/${id_nivel}/preguntas/codigo`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }),
            ]);

            const [dataOpciones, dataCodigo] = await Promise.all([
                resOpciones.json(),
                resCodigo.json()
            ]);
            setEjercicios([...dataOpciones.preguntas, ...dataCodigo.preguntas]);
            console.log('Ejercicios data:', [...dataOpciones.preguntas, ...dataCodigo.preguntas]);
        }
        getEjercicios();
    }, [id_nivel]);

    const tipoLabels = {
        "codigo": "Ejercicio de Código",
        "opcion_multiple": "Ejercicio de Opción Múltiple",
    };

    const calculateLessonsProgress = (items) => {
        const completedItems = items.filter(item => item.completada).length;
        return Math.round((completedItems / items.length) * 100);
    };

    const calculateExerciseProgress = (items) => {
        const completedItems = items.filter(item => item.intento_realizado).length;
        return Math.round((completedItems / items.length) * 100);
    };

    const leccionesProgress = calculateLessonsProgress(lecciones);
    const ejerciciosProgress = calculateExerciseProgress(ejercicios);
    const ejerciciosEnabled = leccionesProgress === 100;

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
                                        {lecciones.length} lecciones disponibles
                                    </p>
                                    <div className="level-section-progress">
                                        <span className="level-progress-text-small level-lecciones-progress-text">
                                            {leccionesProgress}% completado
                                        </span>
                                        <span className="level-progress-text-tiny">
                                            {lecciones.filter(l => l.completada).length} de {lecciones.length} completadas
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
                                        {lecciones.map((leccion, index) => (
                                            <div
                                                key={leccion.id}
                                                className={`level-item 
                                                    ${leccion.completada ? 'level-completed-leccion' : 'level-pending-leccion'} 
                                                    ${leccion.bloqueada ? 'level-disabled-leccion' : ''}`}
                                                onClick={() => {
                                                    if (!leccion.bloqueada) {
                                                        setLeccionSeleccionada(leccion);
                                                        console.log('Selected lesson:', leccion);
                                                        handleOpenLessonsDialog(leccion);
                                                    }
                                                }}
                                            >
                                                <div className="level-item-content">
                                                    <div className="level-item-left">
                                                        <div className={`level-item-number 
                                                            ${leccion.completada ? 'level-completed-number' : 'level-pending-number-leccion'}
                                                            ${leccion.bloqueada ? 'level-disabled-number' : ''}`}
                                                        >
                                                            {leccion.completada ? (
                                                                <CheckCircle size={16} />
                                                            ) : leccion.bloqueada ? (
                                                                <Lock size={16} color="#9ca3af" />
                                                            ) : (
                                                                index + 1
                                                            )}
                                                        </div>
                                                        <div className="level-item-text-container">
                                                            <span className="level-item-name">{leccion.titulo}</span>
                                                            <div className="level-item-status">
                                                                {leccion.bloqueada
                                                                    ? 'Bloqueada'
                                                                    : leccion.completada
                                                                        ? 'Completada'
                                                                        : 'Pendiente'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Play
                                                        size={20}
                                                        color={leccion.bloqueada ? "#d1d5db" : "#9ca3af"}
                                                        className="level-play-icon"
                                                    />
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
                    lessonContent={lessonsContent}
                    updateLecciones={updateLecciones}
                    onNextLesson={handleNextLesson}
                    hasNextLesson={hasNextLesson()}
                />

                {/* Sección de Ejercicios */}
                <div className={`level-section-container ${!ejerciciosEnabled ? 'disabled-section' : ''}`}>
                    <div
                        className={`level-section-card level-ejercicios-card ${ejerciciosExpanded ? 'expanded' : ''}`}
                        onClick={() => {
                            if (ejerciciosEnabled) setEjerciciosExpanded(!ejerciciosExpanded);
                        }}
                    >
                        {/* Header de Ejercicios */}
                        <div className="level-section-header">
                            <div className="level-section-header-left">
                                <div className="level-section-icon level-ejercicios-icon">
                                    <Code size={32} color="white" />
                                </div>
                                <div>
                                    <h2 className="level-section-title">Ejercicios</h2>
                                    <p className="level-section-subtitle">
                                        {ejercicios.length} ejercicios de práctica
                                    </p>
                                    {ejerciciosEnabled ? (
                                        <div className="level-section-progress">
                                            <span className="level-progress-text-small level-ejercicios-progress-text">
                                                {ejerciciosProgress}% completado
                                            </span>
                                            <span className="level-progress-text-tiny">
                                                {ejercicios.filter(e => e.intento_realizado).length} de {ejercicios.length} completados
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="level-section-progress">
                                            <span className="level-progress-text-small level-ejercicios-progress-text">
                                                Bloqueado hasta completar lecciones
                                            </span>
                                        </div>
                                    )}
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
                                        {ejercicios.map((ejercicio, index) => (
                                            <div
                                                key={ejercicio.id}
                                                className={`level-item ${ejercicio.intento_realizado ? 'level-completed-ejercicio' : 'level-pending-ejercicio'}`}
                                                onClick={() => {
                                                    if (ejerciciosEnabled) {
                                                        setEjercicioSeleccionado(ejercicio);
                                                        handleOpenExcerciseDialog();
                                                    }
                                                }}
                                            >
                                                <div className="level-item-content">
                                                    <div className="level-item-left">
                                                        <div className={`level-item-number ${ejercicio.intento_realizado ? 'level-completed-number' : 'level-pending-number-ejercicio'}`}>
                                                            {ejercicio.intento_realizado ? <CheckCircle size={16} /> : index + 1}
                                                        </div>
                                                        <div className="level-item-text-container">
                                                            <span className="level-item-name-small">{tipoLabels[ejercicio.tipo]}</span>
                                                            <div className="level-item-status">
                                                                {ejercicio.intento_realizado ? 'Completado' : 'Pendiente'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Play size={16} color={ejerciciosEnabled ? "#9ca3af" : "#d1d5db"} className="level-play-icon" />
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
