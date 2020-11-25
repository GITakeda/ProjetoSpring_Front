import React from 'react';
import { Button, Typography, Menu, MenuItem, Box, Snackbar } from "@material-ui/core";
import { useState } from 'react';
import Materia from './forms/Materia';
import Mentor from './forms/Mentor';
import Aluno from './forms/Aluno';
import Mentoria from './forms/Mentoria';
import Programa from './forms/Programa';
import Nota from './forms/Nota';
import NotifyContext from "../contexts/NotifyContext";
import useStyles from "./BotoesCadastro/style/buttons"

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

    const telas = [{ component: <Typography component="h2" variant="h3" align="center">Escola</Typography>, name: "" },
    { component: <Materia />, name: "Matéria" },
    { component: <Mentor />, name: "Mentor" },
    { component: <Aluno />, name: "Aluno" },
    { component: <Mentoria />, name: "Mentoria" },
    { component: <Programa />, name: "Programa" },
    { component: <Nota />, name: "Nota" }
    ];

    return (
        <>
            <Box className={useStyles().root}>
                <Button variant="outlined" onClick={() => handleClose(0)}>
                    Home
                </Button>
                <Button variant="outlined" aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                    Menu
                </Button>
            </Box>
            
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleClose(curPage)}
            >
                {telas.map((q, index) => {
                    if (index == 0) {
                        return undefined;
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
                        <Button size="small" variant="contained" color="default" onClick={handleSnackClose}>CLOSE</Button>
                    </React.Fragment>
                }
            />
        </>
    );

}

export default Formulario;