import React from 'react';
import { Button, Typography, Menu, MenuItem, List, ListItem, ListItemText, Box, Snackbar } from "@material-ui/core";
import { useState } from 'react';
import Materia from './Materia';
import Mentor from './Mentor';
import Aluno from './Aluno';
import Mentoria from './Mentoria';
import Programa from './Programa';
import Nota from './Nota';
import NotifyContext from "../../contexts/NotifyContext";

function Formulario() {

    const [anchorEl, setAnchorEl] = useState(null);
    const [curPage, setCurPage] = useState(0);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (page) => {
        setAnchorEl(null);
        setCurPage(page);
    };

    const handleSnackClose = (event, reason) => {
        setOpen(false);
    }

    const notify = (message) => {
        setOpen(true);
        setMessage(message);
    }

    const telas = [{ component: <Typography component="h2" variant="h3" align="center">Escola</Typography>, name: ""},
    { component: <Materia />, name: "Matéria"},
    { component: <Mentor />, name: "Mentor"},
    { component: <Aluno />, name: "Aluno"},
    { component: <Mentoria />, name: "Mentoria"},
    { component: <Programa />, name: "Programa"},
    { component: <Nota />, name: "Nota"}
    ];

    return (
        <>
            <Button variant="outlined" onClick={() => handleClose(0)}>
                Home
            </Button>
            <List component="nav" aria-label="Device settings">
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="cadastro selecionado"
                    onClick={handleClick}
                >
                    <ListItemText primary="Selecione um cadastro" secondary={telas[curPage].name} />
                </ListItem>
            </List>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleClose(curPage)}
            >
                {telas.map((q, index) => {
                    if (index == 0) {
                        return;
                    }
                    return (<MenuItem onClick={(event) => handleClose(event.target.value)} value={index} key={index}>{q.name}</MenuItem>);
                })}
            </Menu>
            <Box width="100%" height="100%">
                <NotifyContext.Provider value={{ notify: notify }}>
                    {telas[curPage].component}
                </NotifyContext.Provider>
            </Box>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={4000}
                onClose={handleSnackClose}
                message={message}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" variant="contained" color="default" onClick={handleSnackClose}>CLOSE</Button>
                    </React.Fragment>
                }
            />
        </>
    );

}

export default Formulario;