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
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Editor from '@monaco-editor/react';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ExerciseDialog({ open, handleClose, ejercicio }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [codeAnswer, setCodeAnswer] = useState(ejercicio?.codigo_inicial || '');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        if (ejercicio?.tipo === 'codigo') {
            setCodeAnswer(ejercicio.codigo_inicial || '');
            setOutput('');
        } else {
            setSelectedOption('');
        }
    }, [ejercicio]);

    useEffect(() => {
        if (editorRef.current && ejercicio?.tipo === 'codigo') {
            editorRef.current.setValue(ejercicio.codigo_inicial || '');
        }
    }, [ejercicio?.codigo_inicial, ejercicio?.tipo]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
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
            // Aquí puedes validar si la respuesta es correcta
            const isCorrect = ejercicio.opciones.find(opt => opt.texto === selectedOption)?.correcta;
            console.log('¿Es correcta?', isCorrect);
        } else if (ejercicio?.tipo === 'codigo') {
            console.log('Código enviado:', codeAnswer);
            // Aquí puedes enviar el código para validación
        }
    };

    const renderMultipleChoice = () => (
        <Box sx={{ p: 2 }}>
            <Typography
                variant="h6"
                sx={{
                    color: '#81D4FA',
                    mb: 3,
                    fontFamily: "'Orbitron', sans-serif"
                }}
            >
                {ejercicio.texto}
            </Typography>

            <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                    value={selectedOption}
                    onChange={handleOptionChange}
                    sx={{ gap: 2 }}
                >
                    {ejercicio.opciones?.map((opcion, index) => (
                        <Paper
                            key={index}
                            elevation={2}
                            sx={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: selectedOption === opcion.texto ? '2px solid #81D4FA' : '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                }
                            }}
                        >
                            <FormControlLabel
                                value={opcion.texto}
                                control={
                                    <Radio
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
                    ))}
                </RadioGroup>
            </FormControl>
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
                {ejercicio.texto}
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
                            🐍 Python Editor
                        </Typography>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<PlayArrowIcon />}
                            onClick={runCode}
                            disabled={isRunning || !codeAnswer.trim()}
                            sx={{
                                background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)',
                                color: 'white',
                                fontSize: '0.75rem',
                                px: 2,
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #66BB6A 30%, #4CAF50 90%)',
                                },
                                '&:disabled': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }}
                        >
                            {isRunning ? 'Ejecutando...' : 'Ejecutar'}
                        </Button>
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
                            📟 Consola
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
                                Presiona "Ejecutar" para ver la salida...
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
                        backgroundColor: 'rgba(10, 10, 10, 0.3)',
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
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, flex: 1 }}>
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
                    </Toolbar>
                </AppBar>

                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    {ejercicio?.tipo === 'opcion_multiple' && renderMultipleChoice()}
                    {ejercicio?.tipo === 'codigo' && renderCodeExercise()}
                </Box>

                <Box sx={{
                    p: 2,
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(10, 10, 10, 0.5)'
                }}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={
                            (ejercicio?.tipo === 'opcion_multiple' && !selectedOption) ||
                            (ejercicio?.tipo === 'codigo' && !codeAnswer.trim())
                        }
                        sx={{
                            width: '100%',
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #81D4FA 30%, #4FC3F7 90%)',
                            color: '#000',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #4FC3F7 30%, #29B6F6 90%)',
                            },
                            '&:disabled': {
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }}
                    >
                        {ejercicio?.tipo === 'opcion_multiple' ? 'Confirmar Respuesta' : 'Ejecutar Código'}
                    </Button>
                </Box>
            </Dialog>
        </div>
    );
}

export default ExerciseDialog;
