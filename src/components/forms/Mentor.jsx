import React from 'react';
import { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import CampoId from '../CampoId';

export default function Mentor(){

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            console.log({Mentor:{nome:nome}});
        }}>

            <Typography component="h2" variant="h3" align="center">Mentor</Typography>

            <CampoId setValue={setId} value={id}/>

            <TextField
            id="nome"
            label="Nome"
            name="nome"
            type="text"
            value={nome}
            onChange={(event) => {
                setNome(event.target.value);
            }}
            fullWidth
            margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
        </form>
    );

}