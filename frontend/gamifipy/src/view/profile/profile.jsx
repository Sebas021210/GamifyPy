import React from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import Insignias from "../../components/InsigniaCarousel";
import Skills from "../../components/SkillsList";
import './profile.css'

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
                    <Insignias />
                </Box>
            </div>
            <div className="profile-skills">
                <h2>Habilidades</h2>
                <Skills />
            </div>
        </div>
    )
}

export default Profile;
