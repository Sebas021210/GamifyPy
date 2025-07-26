import React, { useState } from 'react';
import { Zap } from 'lucide-react';

const generateSkills = () => {
    const skillTemplates = [
        { name: "React Hooks", description: "Manejo avanzado de hooks de React para gestión de estado y efectos secundarios", category: "frontend" },
        { name: "TypeScript", description: "Desarrollo con tipado estático para aplicaciones más robustas y mantenibles", category: "frontend" },
        { name: "Node.js", description: "Desarrollo de servidores y APIs REST con JavaScript del lado del servidor", category: "backend" },
        { name: "MongoDB", description: "Base de datos NoSQL para almacenamiento flexible de documentos", category: "database" },
        { name: "Docker", description: "Containerización de aplicaciones para despliegues consistentes", category: "devops" },
        { name: "AWS", description: "Servicios en la nube para escalabilidad y disponibilidad", category: "cloud" },
        { name: "Python Django", description: "Framework web de Python para desarrollo rápido y limpio", category: "backend" },
        { name: "PostgreSQL", description: "Base de datos relacional avanzada con características empresariales", category: "database" },
        { name: "Vue.js", description: "Framework progresivo para interfaces de usuario reactivas", category: "frontend" },
        { name: "Express.js", description: "Framework minimalista para aplicaciones web de Node.js", category: "backend" },
        { name: "Redis", description: "Base de datos en memoria para cache y sesiones rápidas", category: "database" },
        { name: "Kubernetes", description: "Orquestación de contenedores para aplicaciones escalables", category: "devops" },
        { name: "GraphQL", description: "Lenguaje de consulta para APIs más eficientes y flexibles", category: "api" },
        { name: "Jest Testing", description: "Framework de testing para JavaScript con cobertura completa", category: "testing" },
        { name: "CSS Grid", description: "Sistema de layout bidimensional para diseños complejos", category: "frontend" },
        { name: "Webpack", description: "Bundler de módulos para optimización de aplicaciones web", category: "tools" },
        { name: "Git Workflows", description: "Flujos de trabajo con Git para colaboración efectiva", category: "tools" },
        { name: "API RESTful", description: "Diseño e implementación de APIs siguiendo principios REST", category: "api" },
        { name: "Sass/SCSS", description: "Preprocesador CSS para estilos más organizados y mantenibles", category: "frontend" },
        { name: "React Native", description: "Desarrollo móvil multiplataforma con JavaScript", category: "mobile" },
        { name: "Firebase", description: "Plataforma de Google para desarrollo de aplicaciones web y móviles", category: "cloud" },
        { name: "Electron", description: "Framework para aplicaciones de escritorio con tecnologías web", category: "desktop" },
        { name: "Next.js", description: "Framework de React para aplicaciones web con renderizado híbrido", category: "frontend" },
        { name: "Tailwind CSS", description: "Framework CSS utility-first para diseño rápido y consistente", category: "frontend" },
        { name: "MySQL", description: "Sistema de gestión de bases de datos relacionales", category: "database" },
        { name: "CI/CD", description: "Integración y despliegue continuo para entregas automatizadas", category: "devops" },
        { name: "Nginx", description: "Servidor web y proxy reverso de alto rendimiento", category: "devops" },
        { name: "Socket.io", description: "Comunicación en tiempo real entre cliente y servidor", category: "realtime" },
        { name: "Laravel", description: "Framework PHP elegante para desarrollo web artesanal", category: "backend" },
        { name: "Flutter", description: "Framework de Google para aplicaciones móviles nativas", category: "mobile" },
        { name: "Elasticsearch", description: "Motor de búsqueda y análisis distribuido", category: "search" },
        { name: "Terraform", description: "Infraestructura como código para aprovisionamiento automatizado", category: "devops" },
        { name: "JWT Auth", description: "Autenticación basada en tokens JSON Web Tokens", category: "security" },
        { name: "Microservices", description: "Arquitectura de servicios distribuidos e independientes", category: "architecture" },
        { name: "RabbitMQ", description: "Sistema de mensajería para comunicación asíncrona", category: "messaging" },
        { name: "Apache Kafka", description: "Plataforma de streaming distribuido para big data", category: "messaging" },
        { name: "Machine Learning", description: "Algoritmos de aprendizaje automático con Python", category: "ai" },
        { name: "TensorFlow", description: "Framework de Google para machine learning y deep learning", category: "ai" },
        { name: "Linux Admin", description: "Administración de sistemas Linux y scripting bash", category: "sysadmin" },
        { name: "Blockchain", description: "Tecnología de cadena de bloques y contratos inteligentes", category: "blockchain" },
        { name: "Web3.js", description: "Biblioteca JavaScript para interactuar con Ethereum", category: "blockchain" },
        { name: "Solidity", description: "Lenguaje de programación para contratos inteligentes", category: "blockchain" },
        { name: "Unity 3D", description: "Motor de videojuegos para desarrollo multiplataforma", category: "gamedev" },
        { name: "Blender API", description: "Scripting y automatización en Blender con Python", category: "3d" },
        { name: "WebGL", description: "Gráficos 3D en el navegador con JavaScript", category: "graphics" },
        { name: "D3.js", description: "Visualización de datos interactiva con JavaScript", category: "dataviz" },
        { name: "Pandas", description: "Análisis y manipulación de datos con Python", category: "data" },
        { name: "NumPy", description: "Computación científica y arrays multidimensionales", category: "data" },
        { name: "OpenCV", description: "Biblioteca de visión por computadora y procesamiento de imágenes", category: "ai" },
        { name: "Selenium", description: "Automatización de pruebas web y scraping", category: "testing" },
        { name: "Cypress", description: "Testing end-to-end moderno para aplicaciones web", category: "testing" },
        { name: "Figma API", description: "Integración con Figma para automatización de diseño", category: "design" },
        { name: "Adobe XD", description: "Diseño de interfaces y prototipado interactivo", category: "design" },
        { name: "Photoshop", description: "Edición avanzada de imágenes y diseño gráfico", category: "design" },
        { name: "After Effects", description: "Animación y efectos visuales para motion graphics", category: "design" },
        { name: "Stripe API", description: "Integración de pagos online seguros y escalables", category: "payments" },
        { name: "PayPal SDK", description: "Procesamiento de pagos con la plataforma PayPal", category: "payments" },
        { name: "OAuth 2.0", description: "Protocolo de autorización para acceso seguro a recursos", category: "security" },
        { name: "HTTPS/SSL", description: "Protocolos de seguridad para comunicaciones web cifradas", category: "security" },
        { name: "Penetration Testing", description: "Pruebas de seguridad para identificar vulnerabilidades", category: "security" }
    ];

    return skillTemplates.map((skill, index) => ({
        id: index + 1,
        name: skill.name,
        description: skill.description,
        isUnlocked: Math.random() > 0.2
    }));
};

const skills = generateSkills();

const generatePositions = (totalSkills) => {
    const positions = [];
    const cols = 10;
    const nodeSpacing = 95;
    const startX = 40;
    const startY = 80;

    for (let i = 0; i < totalSkills; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const offsetX = row % 2 === 1 ? nodeSpacing / 2 : 0;

        positions.push({
            x: startX + (col * nodeSpacing) + offsetX,
            y: startY + (row * nodeSpacing * 0.8)
        });
    }

    return positions;
};

const positions = generatePositions(skills.length);

const generateConnections = (totalSkills) => {
    const connections = [];
    const cols = 10;

    for (let i = 0; i < totalSkills; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;

        if (col < cols - 1 && Math.random() > 0.6) {
            connections.push({ from: i, to: i + 1 });
        }
        if (row < Math.floor((totalSkills - 1) / cols) && Math.random() > 0.7) {
            const nextRowIndex = i + cols;
            if (nextRowIndex < totalSkills) {
                connections.push({ from: i, to: nextRowIndex });
            }
        }
    }

    return connections;
};

const connections = generateConnections(skills.length);

const styles = {
    container: {
        width: '100%',
        maxWidth: '1030px',
        position: 'relative'
    },
    treeContainer: {
        position: 'relative',
        marginBottom: '24px',
        overflowX: 'auto',
        overflowY: 'hidden'
    },
    treeContent: {
        minWidth: 'fit-content',
        height: '500px',
        position: 'relative'
    },
    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
    },
    skillNode: {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        zIndex: 10
    },
    skillNodeSelected: {
        transform: 'translate(-50%, -50%) scale(1.1)',
        zIndex: 20
    },
    skillNodeUnlocked: {
        opacity: 1
    },
    skillNodeLocked: {
        opacity: 0.3
    },
    nodeCircle: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#374151',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#6b7280',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
    },
    nodeCircleSelected: {
        backgroundColor: '#1f2937',
        borderColor: '#3b82f6',
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
    },
    nodeCircleLocked: {
        backgroundColor: '#1f2937',
        borderColor: '#374151'
    },
    detailsPanel: {
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        border: '1px solid #374151',
        maxWidth: '400px',
        margin: '0 auto 40px auto',
        transition: 'all 0.3s ease'
    },
    skillName: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '8px'
    },
    skillDescription: {
        color: '#d1d5db',
        fontSize: '14px',
        lineHeight: '1.6',
        marginBottom: '16px'
    },
    placeholder: {
        textAlign: 'center',
        color: '#9ca3af',
        padding: '0 0 60px 0'
    },
    placeholderIcon: {
        width: '32px',
        height: '32px',
        margin: '0 auto 16px',
        opacity: 0.5
    }
};

function SkillNode({ skill, position, isSelected, onClick, isUnlocked }) {
    const nodeStyle = {
        ...styles.skillNode,
        ...(isSelected ? styles.skillNodeSelected : {}),
        ...(isUnlocked ? styles.skillNodeUnlocked : styles.skillNodeLocked),
        left: position.x,
        top: position.y
    };

    const circleStyle = {
        ...styles.nodeCircle,
        ...(isSelected ? styles.nodeCircleSelected : {}),
        ...(!isUnlocked ? styles.nodeCircleLocked : {})
    };

    return (
        <div
            style={nodeStyle}
            onClick={() => onClick(skill)}
            onMouseEnter={(e) => {
                if (isUnlocked) {
                    e.currentTarget.style.transform = isSelected
                        ? 'translate(-50%, -50%) scale(1.15)'
                        : 'translate(-50%, -50%) scale(1.05)';
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = isSelected
                    ? 'translate(-50%, -50%) scale(1.1)'
                    : 'translate(-50%, -50%) scale(1)';
            }}
        >
            <div style={circleStyle}>
                <Zap
                    size={20}
                    color={isSelected ? '#3b82f6' : isUnlocked ? '#6b7280' : '#374151'}
                />
            </div>
        </div>
    );
}

function ConnectionLine({ fromPos, toPos, isActive }) {
    return (
        <line
            x1={fromPos.x}
            y1={fromPos.y}
            x2={toPos.x}
            y2={toPos.y}
            stroke={isActive ? "rgba(59, 130, 246, 0.4)" : "rgba(255, 255, 255, 0.1)"}
            strokeWidth="1"
            style={{ transition: 'all 0.3s ease' }}
        />
    );
}

function SkillDetails({ skill }) {
    if (!skill) return null;

    return (
        <div style={styles.detailsPanel}>
            <h3 style={styles.skillName}>
                {skill.name}
            </h3>

            <p style={styles.skillDescription}>
                {skill.description}
            </p>
        </div>
    );
}

function Skills() {
    const [selectedSkill, setSelectedSkill] = useState(null);

    const handleSkillClick = (skill) => {
        if (!skill.isUnlocked) return;
        setSelectedSkill(selectedSkill?.id === skill.id ? null : skill);
    };

    return (
        <div style={styles.container}>
            <div style={styles.treeContainer}>
                <div style={styles.treeContent}>
                    <svg style={styles.svg}>
                        {connections.map((connection, index) => (
                            <ConnectionLine
                                key={index}
                                fromPos={positions[connection.from]}
                                toPos={positions[connection.to]}
                                isActive={
                                    selectedSkill &&
                                    (selectedSkill.id === skills[connection.from].id ||
                                        selectedSkill.id === skills[connection.to].id)
                                }
                            />
                        ))}
                    </svg>

                    {skills.map((skill, index) => (
                        <SkillNode
                            key={skill.id}
                            skill={skill}
                            position={positions[index]}
                            isSelected={selectedSkill?.id === skill.id}
                            onClick={handleSkillClick}
                            isUnlocked={skill.isUnlocked}
                        />
                    ))}
                </div>
            </div>

            {selectedSkill && (
                <SkillDetails skill={selectedSkill} />
            )}

            {!selectedSkill && (
                <div style={styles.placeholder}>
                    <Zap style={styles.placeholderIcon} />
                    <p>Haz clic en una habilidad para ver los detalles</p>
                </div>
            )}
        </div>
    );
}

export default Skills;
