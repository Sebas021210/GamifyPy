import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import './profile.css'

const data = [
    {
        src: 'http://127.0.0.1:8000/static/insignias/Categoria/Categoria1.png',
        title: 'AVANCE A INTERMEDIO',
    },
    {
        src: 'http://127.0.0.1:8000/static/insignias/Categoria/Categoria2.png',
        title: 'AVANCE A AVANZADO',
    },
    {
        src: 'http://127.0.0.1:8000/static/insignias/Categoria/Categoria3.png',
        title: 'AVANCE A EXPERTO',
    },
];

function Media() {
    return (
        <Grid container wrap="nowrap">
            {data.map((item, index) => (
                <Box key={index} sx={{ width: 210, marginRight: 0.5, mt: 4 }}>
                    <img
                        style={{ width: 180, height: 170 }}
                        alt={item.title}
                        src={item.src}
                    />
                    <Box sx={{ pr: 2, textAlign: 'center' }}>
                        <Typography gutterBottom variant="body2" sx={{ fontFamily: 'Orbitron, sans-serif' }}>
                            {item.title}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Grid>
    );
}

function Profile() {
    return (
        <div className="page-container">
            <div className="profile-Header">
                <div className="profile-Header-buttons">
                    <IconButton>
                        <ArrowBackIcon />
                    </IconButton>
                    <IconButton>
                        <LogoutIcon />
                    </IconButton>
                </div>
                <div className="profile-Header-user">
                    <h1>Sebastián Solorzano</h1>
                </div>
            </div>
            <div className="profile-statistics">
                <p>Categoria: Intermedio</p>
                <p>Nivel actual: Nivel 3 - Bucles</p>
                <p>Puntos de experiencia (XP): 100</p>
            </div>
            <div className="profile-insignias">
                <h2>Insignias</h2>
                <Box sx={{ overflow: 'hidden' }}>
                    <Media />
                </Box>
            </div>
            <div className="profile-skills">
                <h2>Habilidades</h2>
            </div>
        </div>
    )
}

export default Profile;
