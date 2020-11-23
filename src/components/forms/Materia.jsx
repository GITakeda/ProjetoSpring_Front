import React from 'react';
import { TextField, Button, Typography, Container, IconButton } from "@material-ui/core";
import { useState } from 'react';
import CampoId from '../CampoId';

export default function Materia() {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    function buscarMateria() {

    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            console.log({ Materia: { nome, descricao } });
        }}>
            <Typography component="h2" variant="h3" align="center">Matéria</Typography>

            <CampoId setValue={setId} value={id} />

            <TextField
                onChange={(event) => {
                    setNome(event.target.value);
                }}
                id="nome"
                label="Nome"
                type="text"
                margin="normal"

            ></TextField>


            <TextField
                onChange={(event) => {
                    setDescricao(event.target.value);
                }}
                id="descricao"
                label="Descrição"
                type="text"
                fullWidth
                margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" >Cadastrar</Button>
        </form>)
}