import { TextField, InputLabel, Select, Box, MenuItem, Button } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import CampoId from '../CampoId';
import {getMentoria}  from '../../model/MentoriaData'
import {getMateria} from '../../model/MateriaData'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useEffect } from 'react';
import httpService from '../../services/httpService'

export default function Nota() {

    const [id, setId] = useState(0);
    const [materia_id, setMateria_id] = useState(0);
    const [mentoria_id, setMentoria_id] = useState(0);
    const [data, setData] = useState(Date.now);
    const [pontuacao, setPontuacao] = useState(0.0);

    const [materias, setMaterias] = useState([]);
    const [mentorias, setMentorias] = useState([]);

    useEffect(() => {
        // setMaterias([...getMaterias()]);
        getMentoria(setMaterias);
        getMateria(setMentorias);
        // httpService.get("/materia").then(({data}) => {
        //     setMaterias(data);
        // })
        // .catch(error => {console.log(error)});
    }, []);

    return (
        <form onSubmit={
            (event) => {
                event.preventDefault();
                console.log({ Nota: { id: id, materia_id: materia_id, mentoria_id: mentoria_id, data: data, pontuacao: pontuacao } });
            }
        }>
            <CampoId setValue={setId} value={id} />

            <Box >
                <InputLabel>Mentoria</InputLabel>
                <Select
                    onChange={(event) => {
                        setMentoria_id(event.target.value);
                    }}
                    id="select-mentoria"
                    value={mentoria_id}
                    fullWidth>
                    {mentorias.map((mentoria) => {
                        return (<MenuItem key={mentoria.id} value={mentoria.id}>{mentoria.aluno_id + " - " + mentoria.mentor_id}</MenuItem>);
                    })}
                </Select>

                <InputLabel>Matéria</InputLabel>
                <Select
                    onChange={(event) => {
                        setMateria_id(event.target.value);
                    }}
                    id="select-materia"
                    value={materia_id}
                    fullWidth>
                    {materias.map((materia) => {
                        return (<MenuItem key={materia.id} value={materia.id}>{materia.nome}</MenuItem>);
                    })}
                </Select>
            </Box>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="datePicker"
                    label="Período da nota"
                    value={data}
                    onChange={
                        (date) => {
                            const formatter = new Intl.DateTimeFormat('en');
                            console.log(formatter.format(date))
                            setData(formatter.format(date));
                        }
                    }
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>

            <TextField
                onChange={
                    (event) => {
                        setPontuacao(Number(event.target.value.replace(',', '.')));
                    }
                }
                id="pontuacao"
                label="Pontuação"
                type="number"
                fullWidth
                value={pontuacao}
            />

            <Button variant="contained" type="submit" color="primary">Cadastrar</Button>

        </form>
    );
}