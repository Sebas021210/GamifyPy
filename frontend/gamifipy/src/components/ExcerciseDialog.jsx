import React, { useState, useRef, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Editor from '@monaco-editor/react';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ExerciseDialog({ open, handleClose, ejercicio }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [answerConfirmed, setAnswerConfirmed] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [codeAnswer, setCodeAnswer] = useState(ejercicio?.codigo_inicial || '');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        if (!open) {
            setCodeAnswer('');
            setOutput('');
            setSelectedOption('');
            setAnswerConfirmed(false);
            setCorrectAnswer(null);
        } else if (ejercicio?.tipo === 'codigo') {
            setCodeAnswer(ejercicio.codigo_inicial || '');
            setOutput('');
        } else {
            setSelectedOption('');
            setAnswerConfirmed(false);
            setCorrectAnswer(null);
        }
    }, [ejercicio, open]);

    useEffect(() => {
        if (editorRef.current && ejercicio?.tipo === 'codigo') {
            editorRef.current.setValue(ejercicio.codigo_inicial || '');
        }
    }, [ejercicio?.codigo_inicial, ejercicio?.tipo]);

    const handleOptionChange = (event) => {
        if (!answerConfirmed) {
            setSelectedOption(event.target.value);
        }
    };

    const handleAnswerConfirm = () => {
        const optionSelected = ejercicio.opciones.find(opt => opt.texto === selectedOption);
        const isCorrect = Boolean(optionSelected?.valor);

        setAnswerConfirmed(true);
        setCorrectAnswer(isCorrect);
    };

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        monaco.editor.defineTheme('cyberTheme', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955' },
                { token: 'keyword', foreground: '569CD6' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'number', foreground: 'B5CEA8' },
                { token: 'identifier', foreground: '9CDCFE' },
            ],
            colors: {
                'editor.background': '#0a0a0a',
                'editor.foreground': '#ffffff',
                'editorLineNumber.foreground': '#81D4FA',
                'editor.selectionBackground': '#264f78',
                'editor.lineHighlightBackground': '#2a2d2e',
            },
        });

        monaco.editor.setTheme('cyberTheme');
    };

    const handleCodeChange = (value) => {
        setCodeAnswer(value || '');
    };

    const runCode = async () => {
        setIsRunning(true);
        setOutput('Ejecutando código...');

        setTimeout(() => {
            try {
                if (codeAnswer.includes('print')) {
                    const printMatches = codeAnswer.match(/print\(['"`](.*?)['"`]\)/g);
                    if (printMatches) {
                        const outputs = printMatches.map(match => {
                            const content = match.match(/print\(['"`](.*?)['"`]\)/)[1];
                            return content;
                        });
                        setOutput(outputs.join('\n'));
                    } else {
                        setOutput('Código ejecutado correctamente');
                    }
                } else {
                    setOutput('Código ejecutado correctamente');
                }
            } catch (error) {
                setOutput('Error: ' + error.message);
            }
            setIsRunning(false);
        }, 1500);
    };

    const handleSubmit = () => {
        if (ejercicio?.tipo === 'opcion_multiple') {
            console.log('Respuesta seleccionada:', selectedOption);
            console.log('Respuesta correcta:', correctAnswer);
            handleClose();
        } else if (ejercicio?.tipo === 'codigo') {
            console.log('Código enviado:', codeAnswer);
            handleClose();
        }
    };

    const renderMultipleChoice = () => (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ color: '#81D4FA', mb: 3, fontFamily: "'Orbitron', sans-serif" }}>
                {ejercicio.pregunta}
            </Typography>

            <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup value={selectedOption} onChange={handleOptionChange} sx={{ gap: 2 }}>
                    {ejercicio.opciones?.map((opcion, index) => {
                        const esSeleccionada = selectedOption === opcion.texto;
                        const esCorrecta = Boolean(opcion.valor);

                        let borderColor = 'rgba(255, 255, 255, 0.1)';
                        if (answerConfirmed) {
                            if (esSeleccionada && esCorrecta) borderColor = '#4CAF50';
                            else if (esSeleccionada && !esCorrecta) borderColor = '#f44336';
                            else if (!esSeleccionada && esCorrecta) borderColor = '#4CAF50';
                        } else {
                            borderColor = esSeleccionada ? '#81D4FA' : 'rgba(255, 255, 255, 0.1)';
                        }

                        return (
                            <Paper
                                key={index}
                                elevation={2}
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: `2px solid ${borderColor}`,
                                    borderRadius: '12px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        border: `2px solid ${borderColor}`,
                                    }
                                }}
                            >
                                <FormControlLabel
                                    value={opcion.texto}
                                    control={
                                        <Radio
                                            disabled={answerConfirmed}
                                            sx={{
                                                color: '#81D4FA',
                                                '&.Mui-checked': {
                                                    color: '#81D4FA'
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography sx={{ color: 'white', fontSize: '1.1rem' }}>
                                            {opcion.texto}
                                        </Typography>
                                    }
                                    sx={{
                                        width: '100%',
                                        margin: 0,
                                        padding: '16px 20px',
                                        borderRadius: '12px'
                                    }}
                                />
                            </Paper>
                        );
                    })}
                </RadioGroup>
            </FormControl>

            {!answerConfirmed && (
                <Box sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        onClick={handleAnswerConfirm}
                        disabled={!selectedOption}
                        sx={{
                            backgroundColor: '#81D4FA',
                            color: '#000',
                            fontWeight: 'bold',
                            px: 4,
                            py: 1.5,
                            fontSize: '0.9rem',
                            borderRadius: '12px',
                            '&:hover': {
                                boxShadow: '0 6px 10px rgba(129, 212, 250, 0.3)',
                            },
                            '&:disabled': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'rgba(255, 255, 255, 0.3)',
                            }
                        }}
                    >
                        Confirmar respuesta
                    </Button>
                </Box>
            )}
        </Box>
    );

    const renderCodeExercise = () => (
        <Box sx={{ p: 2, height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
            <Typography
                variant="h6"
                sx={{
                    color: '#81D4FA',
                    mb: 3,
                    fontFamily: "'Orbitron', sans-serif"
                }}
            >
                {ejercicio.pregunta}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, minHeight: 0 }}>
                {/* Editor de código */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: 1,
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(129, 212, 250, 0.3)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box sx={{
                        p: 1.5,
                        background: 'rgba(129, 212, 250, 0.1)',
                        borderBottom: '1px solid rgba(129, 212, 250, 0.2)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#81D4FA',
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                fontWeight: 'bold'
                            }}
                        >
                            main.py
                        </Typography>
                        <IconButton
                            onClick={runCode}
                            disabled={isRunning || !codeAnswer.trim()}
                            sx={{
                                opacity: (isRunning || !codeAnswer.trim()) ? 0.3 : 1,
                                transition: 'opacity 0.3s ease',
                            }}
                        >
                            <PlayArrowIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1, minHeight: 0 }}>
                        <Editor
                            height="100%"
                            defaultLanguage="python"
                            value={codeAnswer}
                            onChange={handleCodeChange}
                            onMount={handleEditorDidMount}
                            options={{
                                fontSize: 14,
                                fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace",
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                renderLineHighlight: 'gutter',
                                lineNumbers: 'on',
                                folding: true,
                                wordWrap: 'on',
                                automaticLayout: true,
                                tabSize: 4,
                                insertSpaces: true,
                                renderWhitespace: 'selection',
                                bracketPairColorization: { enabled: true },
                                guides: {
                                    indentation: true,
                                    bracketPairs: true
                                }
                            }}
                        />
                    </Box>
                </Paper>

                {/* Panel de salida */}
                <Paper
                    elevation={3}
                    sx={{
                        width: '300px',
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box sx={{
                        p: 1.5,
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#81D4FA',
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                fontWeight: 'bold'
                            }}
                        >
                            Consola
                        </Typography>
                    </Box>

                    <Box sx={{
                        flexGrow: 1,
                        p: 2,
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        color: '#00ff00',
                        backgroundColor: '#000',
                        overflow: 'auto',
                        minHeight: '200px'
                    }}>
                        {output ? (
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                                {output}
                            </pre>
                        ) : (
                            <Typography
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    fontStyle: 'italic'
                                }}
                            >
                                Presiona "Comprobar" para ver el resultado de tu código...
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Box>
    );

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                slots={{
                    transition: Transition,
                }}
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f0f23 100%)',
                        color: '#fff',
                    },
                }}
            >
                <AppBar
                    sx={{
                        position: 'relative',
                        backgroundColor: 'rgba(10, 10, 10, 0.6)',
                        boxShadow: 'none',
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={handleClose}
                            aria-label="close"
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                            {ejercicio?.tipo === 'opcion_multiple' ? (
                                <QuizIcon sx={{ color: '#81D4FA', mr: 1 }} />
                            ) : (
                                <CodeIcon sx={{ color: '#81D4FA', mr: 1 }} />
                            )}
                            <Typography
                                sx={{
                                    color: '#81D4FA',
                                    fontSize: '1.5rem',
                                    fontFamily: "'Orbitron', sans-serif"
                                }}
                                variant="h6"
                                component="div"
                            >
                                {ejercicio?.tipo === 'opcion_multiple' ? 'Pregunta' : 'Ejercicio de Código'}
                            </Typography>
                            <Chip
                                label={`${ejercicio?.puntos || 0} pts`}
                                size="small"
                                sx={{
                                    ml: 2,
                                    backgroundColor: 'rgba(129, 212, 250, 0.2)',
                                    color: '#81D4FA',
                                    fontWeight: 'bold'
                                }}
                            />
                        </Box>

                        <Box sx={{ ml: 'auto', p: 2 }}>
                            <Button
                                variant="contained"
                                color="inherit"
                                onClick={handleSubmit}
                                disabled={
                                    (ejercicio?.tipo === 'opcion_multiple' && !answerConfirmed) ||
                                    (ejercicio?.tipo === 'codigo' && output === '')
                                }
                                startIcon={
                                    !(
                                        (ejercicio?.tipo === 'opcion_multiple' && !answerConfirmed) ||
                                        (ejercicio?.tipo === 'codigo' && output === '')
                                    ) && (
                                        <CheckCircleIcon sx={{ color: '#fff' }} />
                                    )
                                }
                                sx={{
                                    py: 1.5,
                                    px: 3,
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    background: '#66BB6A',
                                    color: '#fff',
                                    border: '2px solid rgba(102, 187, 106, 0.3)',
                                    borderRadius: '25px',
                                    minWidth: '200px',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': {
                                        boxShadow: (ejercicio?.tipo === 'opcion_multiple' && !answerConfirmed) ||
                                            (ejercicio?.tipo === 'codigo' && output === '')
                                            ? 'none'
                                            : '0 8px 10px rgba(102, 187, 106, 0.4)',
                                        transform: (ejercicio?.tipo === 'opcion_multiple' && !answerConfirmed) ||
                                            (ejercicio?.tipo === 'codigo' && output === '')
                                            ? 'none'
                                            : 'translateY(-2px)',
                                    },
                                    '&:disabled': {
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        color: 'rgba(255, 255, 255, 0.3)',
                                        border: '2px solid rgba(255, 255, 255, 0.2)',
                                        cursor: 'not-allowed'
                                    },
                                }}
                            >
                                {ejercicio?.tipo === 'opcion_multiple' ? 'Finalizar Ejercicio' : 'Terminar Ejercicio'}
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    {ejercicio?.tipo === 'opcion_multiple' && renderMultipleChoice()}
                    {ejercicio?.tipo === 'codigo' && renderCodeExercise()}
                </Box>
            </Dialog>
        </div>
    );
}

export default ExerciseDialog;
