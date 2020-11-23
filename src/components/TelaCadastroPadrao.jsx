import React from 'react';
import { TextField, Button, Typography, Container, IconButton, DialogTitle } from "@material-ui/core";
import { useState } from 'react';

export default function TelaCadastroPadao({ title, inputs }) {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    function buscarMateria() {

    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            const model =
                console.log({ Materia: { nome, descricao } });
        }}>
            <Typography component="h2" variant="h3" align="center">{title}</Typography>

            {inputs.forEach(element => {
                return (
                    element
                )
            })}

            <Button type="submit" variant="contained" color="primary" >Cadastrar</Button>
        </form>)
}