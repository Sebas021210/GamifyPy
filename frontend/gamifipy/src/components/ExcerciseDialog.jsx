import React from "react";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ExerciseDialog({ open, handleClose, ejercicio }) {
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
                            {ejercicio?.nombre}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItemButton sx={{ color: 'white' }}>
                        <ListItemText
                            primary="Phone ringtone"
                            secondary="Titania"
                            primaryTypographyProps={{ color: 'white' }}
                            secondaryTypographyProps={{ color: '#ccc' }}
                        />
                    </ListItemButton>
                    <Divider sx={{ borderColor: '#444' }} />
                    <ListItemButton sx={{ color: 'white' }}>
                        <ListItemText
                            primary="Default notification ringtone"
                            secondary="Tethys"
                            primaryTypographyProps={{ color: 'white' }}
                            secondaryTypographyProps={{ color: '#ccc' }}
                        />
                    </ListItemButton>
                </List>
            </Dialog>
        </div>
    );
}

export default ExerciseDialog;
