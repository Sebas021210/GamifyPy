import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LevelContent from "../../components/LevelContent";
import './LevelView.css'

function LevelView() {
    const { levelId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="levelView-Container">
            <div className="levelView-Header">
                <div className="levelView-Header-buttons">
                    <IconButton onClick={() => navigate('/levels')} >
                        <ArrowBackIcon />
                    </IconButton>
                </div>
                <div className="levelView-Header-title">
                    <h1>Nivel {levelId}</h1>
                </div>
                <div className="levelView-Heder-Description">
                    <p>Aprende los conceptos básicos de programación en Python. Desde variables y tipos de datos hasta estructuras de control básicas.</p>
                </div>
            </div>
            <div className="levelView-Body">
                <LevelContent />
            </div>
        </div>
    )
}

export default LevelView;
