import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';

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

const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 6,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 2,
        numScroll: 1
    }
];

function Insignias() {
    const itemTemplate = (item) => (
        <Box className="text-center py-5 px-3">
            <img
                src={item.src}
                alt={item.title}
                style={{ width: '160px', height: '160px', objectFit: 'contain' }}
            />
            <Typography variant="body2" sx={{ fontFamily: 'Orbitron, sans-serif', mt: 2 }}>
                {item.title}
            </Typography>
        </Box>
    );

    return (
        <>
            {data.length < 7 ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        gap: 2,
                        mt: 3
                    }}
                >
                    {data.map((item, index) => (
                        <Box key={index} className="text-center">
                            {itemTemplate(item)}
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box sx={{ mt: 3 }}>
                    <Carousel
                        value={data}
                        itemTemplate={itemTemplate}
                        numVisible={6}
                        numScroll={1}
                        responsiveOptions={responsiveOptions}
                        circular={false}
                        showIndicators={false}
                        showNavigators={true}
                    />
                </Box>
            )}
        </>
    );
}

export default Insignias;
