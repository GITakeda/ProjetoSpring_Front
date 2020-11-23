import { Button, Box, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import {getAluno} from '../../model/AlunoData';
import {getMentor} from '../../model/MentorData';
import CampoId from '../CampoId';

export default function Mentoria() {

    const [id, setId] = useState(0);
    const [aluno_id, setAluno_id] = useState(0);
    const [mentor_id, setMentor_id] = useState(0);

    return (
        <form onSubmit={
            (event) => {
                event.preventDefault();
                console.log({ Mentoria: { id: id, aluno_id: aluno_id, mentor_id: mentor_id } });
            }
        }>
            <Typography component="h2" variant="h3" align="center">Mentoria</Typography>

            <CampoId setValue={setId} value={id} />

            <Box >
                <InputLabel>Aluno</InputLabel>
                <Select
                    onChange={(event) => {
                        setAluno_id(event.target.value);
                    }}
                    id="select-aluno"
                    value={aluno_id}
                    fullWidth>
                    {getAluno().map((aluno) => {
                        return (<MenuItem key={aluno.id} value={aluno.id}>{aluno.nome}</MenuItem>);
                    })}
                </Select>

                <InputLabel>Mentor</InputLabel>
                <Select
                    onChange={(event) => {
                        setMentor_id(event.target.value);
                    }}
                    id="select-mentor"
                    value={mentor_id}
                    fullWidth>
                    {getMentor().map((mentor) => {
                        return (<MenuItem key={mentor.id} value={mentor.id}>{mentor.nome}</MenuItem>);
                    })}
                </Select>
            </Box>
            <footer>
                <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
            </footer>
        </form>
    );


}