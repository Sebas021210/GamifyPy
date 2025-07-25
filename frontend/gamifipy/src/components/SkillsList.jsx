import React from "react";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { styled } from '@mui/material/styles';

const StyledFixedSizeList = styled(FixedSizeList)(() => ({
    '& ::-webkit-scrollbar': {
        width: '8px',
    },
    '& ::-webkit-scrollbar-track': {
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
    },
    '& ::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '10px',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.5)',
        },
    },
    '& ::-webkit-scrollbar-thumb:active': {
        background: 'rgba(255, 255, 255, 0.7)',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)',
}));

const StyledListItem = styled(ListItem)(() => ({
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
}));

const StyledListItemButton = styled(ListItemButton)(() => ({
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
}));

const items = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    text: 'Creación y modificación de listas: Definir listas, acceder a elementos por índice y modificar su contenido comprendiendo su naturaleza mutable.',
}));

const ITEM_HEIGHT = 46;
const MAX_VISIBLE_ITEMS = 8;

function renderRow(props) {
    const { index, style } = props;
    const item = items[index];

    return (
        <ListItem style={style} key={item.id} component="div" disablePadding>
            <StyledListItemButton>
                <ListItemText primary={item.text} />
            </StyledListItemButton>
        </ListItem>
    );
}

function Skills() {
    const listHeight = Math.min(items.length, MAX_VISIBLE_ITEMS) * ITEM_HEIGHT;

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 1100,
                bgcolor: 'transparent',
                mt: 3,
                mb: 7,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '3px',
            }}
        >
            <StyledFixedSizeList
                height={listHeight}
                width="100%"
                itemSize={ITEM_HEIGHT}
                itemCount={items.length}
                overscanCount={5}
            >
                {renderRow}
            </StyledFixedSizeList>
        </Box>
    );
}

export default Skills;
