import React from "react";
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ReactMarkdown from 'react-markdown';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const markdownContent = `
### Objetivo:
Aprender a declarar variables, nombrarlas correctamente y usarlas para guardar información.

---

### ¿Qué es una variable?
Una variable es como una caja con una etiqueta: puedes guardar datos dentro, como texto, números o valores lógicos. Luego puedes abrir esa caja (leer el valor) o cambiar su contenido.

\`\`\`python
edad = 18 # "edad" es la etiqueta, 18 es lo que guardamos
\`\`\`

### Cómo crear variables
Solo escribe un nombre, un signo igual = y el valor que quieras guardar:

\`\`\`python
nombre = "Lucía"
\`\`\`

---
`;

function LessonsDialog({ open, handleClose, leccion }) {
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
                        <Typography
                            sx={{
                                ml: 2,
                                flex: 1,
                                color: '#81D4FA',
                                fontSize: '1.75rem',
                                fontFamily: "'Orbitron', sans-serif"
                            }}
                            variant="h6"
                            component="div"
                        >
                            Lección {leccion?.id}: {leccion?.nombre}
                        </Typography>


                    </Toolbar>
                </AppBar>

                <Box sx={{ padding: 4, color: 'white' }}>
                    <ReactMarkdown
                        children={markdownContent}
                        components={{
                            h1: ({ ...props }) => <h1 style={{ color: '#4FC3F7', fontSize: '2rem', marginTop: '1.5rem' }} {...props} />,
                            h2: ({ ...props }) => <h2 style={{ color: '#81D4FA', fontSize: '1.75rem', marginTop: '1.25rem' }} {...props} />,
                            h3: ({ ...props }) => <h3 style={{ color: '#B3E5FC', fontSize: '1.5rem', marginTop: '1rem' }} {...props} />,
                            h4: ({ ...props }) => <h4 style={{ color: '#E1F5FE', fontSize: '1.25rem', marginTop: '0.75rem' }} {...props} />,
                            h5: ({ ...props }) => <h5 style={{ color: '#E0F7FA', fontSize: '1.1rem' }} {...props} />,
                            h6: ({ ...props }) => <h6 style={{ color: '#B2EBF2', fontSize: '1rem' }} {...props} />,

                            p: ({ ...props }) => <p style={{ color: '#ddd', lineHeight: 1.6, marginBottom: '1rem' }} {...props} />,

                            code: ({ inline, children, ...props }) => {
                                return inline ? (
                                    <code style={{ backgroundColor: '#1e1e2f', color: '#00e676', padding: '2px 4px', borderRadius: '4px' }} {...props}>
                                        {children}
                                    </code>
                                ) : (
                                    <pre style={{
                                        backgroundColor: '#1e1e2f',
                                        color: '#00e676',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        overflowX: 'auto',
                                        marginBottom: '1rem'
                                    }}>
                                        <code {...props}>{children}</code>
                                    </pre>
                                );
                            },

                            ul: ({ ...props }) => <ul style={{ color: '#ccc', paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
                            ol: ({ ...props }) => <ol style={{ color: '#ccc', paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
                            li: ({ ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />,

                            table: ({ ...props }) => (
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    margin: '1rem 0',
                                    color: '#eee'
                                }} {...props} />
                            ),
                            thead: ({ ...props }) => <thead style={{ backgroundColor: '#333' }} {...props} />,
                            tbody: ({ ...props }) => <tbody {...props} />,
                            tr: ({ ...props }) => <tr style={{ borderBottom: '1px solid #444' }} {...props} />,
                            th: ({ ...props }) => <th style={{ padding: '0.75rem', border: '1px solid #555', fontWeight: 'bold' }} {...props} />,
                            td: ({ ...props }) => <td style={{ padding: '0.75rem', border: '1px solid #555' }} {...props} />,

                            blockquote: ({ ...props }) => (
                                <blockquote style={{
                                    borderLeft: '4px solid #81D4FA',
                                    margin: '1rem 0',
                                    padding: '0.5rem 1rem',
                                    color: '#aaa',
                                    backgroundColor: '#121212'
                                }} {...props} />
                            ),

                            a: ({ ...props }) => <a style={{ color: '#4FC3F7', textDecoration: 'underline' }} {...props} />,

                            img: ({ ...props }) => (
                                <img
                                    style={{ maxWidth: '100%', borderRadius: '8px', margin: '1rem 0' }}
                                    alt={props.alt || 'imagen'}
                                    {...props}
                                />
                            ),

                            hr: () => <hr style={{ border: 'none', borderTop: '1px solid #444', margin: '2rem 0' }} />,
                        }}
                    />
                </Box>
            </Dialog>
        </div>
    );
}

export default LessonsDialog;
