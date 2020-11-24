import { TextField, InputLabel, Select, Box, MenuItem, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import CampoId from '../CampoId';
import { getMentoria } from '../../model/MentoriaData'
import { getMateria } from '../../model/MateriaData'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useEffect } from 'react';
import { useContext } from 'react';
import NotifyContext from '../../contexts/NotifyContext';
import { deleteByIdNota, getByIdNota, getNota, postNota, putNota } from '../../model/NotaData';
import BotoesCadastro from '../BotoesCadastro';
import AccordionGenerico from '../AccordionGenerico';
import TableGenerica from '../Table/TableGenerica';

export default function Nota() {

    const [id, setId] = useState(0);
    const [materia_id, setMateria_id] = useState(0);
    const [mentoria_id, setMentoria_id] = useState(0);
    const [data, setData] = useState(Date.now);
    const [pontuacao, setPontuacao] = useState(0.0);

    const [notas, setNotas] = useState([]);

    const [materias, setMaterias] = useState([]);
    const [mentorias, setMentorias] = useState([]);

    const [atualizou, setAtualizou] = useState(0);

    const { notify } = useContext(NotifyContext);

    const handleBusca = () => {
        getByIdNota(Number(id), setEntity, errorHandler);
    }

    const setEntity = (retorno) => {
        setId(retorno.id);
        setMateria_id(retorno.materiaDTO.id);
        setMentoria_id(retorno.mentoriaDTO.id);
        setData(retorno.data);
        setPontuacao(retorno.pontuacao);
    }

    const errorHandler = (error) => {
        limpar();
        if (error.response) {
            notify(error.response.data.mensagem);
        }
    }

    const limpar = () => {
        setId(0);
        setMateria_id(0);
        setMentoria_id(0);
        setData(Date.now);
        setPontuacao(0.0);
    }

    const apagar = () => {
        deleteByIdNota(id, () => {
            limpar();
            notify("Nota excluída");
        }, errorHandler);
    }

    const atualizar = () => {
        setAtualizou(atualizou + 1);
    }

    const resizeStringWithSize = (string, maxSize) => {
        if (string.length > maxSize) {
            return `${string.slice(0, maxSize)}...`;
        }

        return string;
    }

    const resizeString = (string) => {
        return resizeStringWithSize(string, 10);
    }

    useEffect(() => {
        getNota(setNotas, errorHandler);
        getMateria(setMaterias, errorHandler);
        getMentoria(setMentorias, errorHandler);
    }, [atualizou]);

    return (
        <form onSubmit={
            (event) => {
                limpar();
                const nota = { id: id, 
                    mentoriaDTO: { id: mentoria_id }, 
                    materiaDTO: { id: materia_id }, 
                    data: (new Date(data)).toJSON(), 
                    pontuacao: pontuacao }
                event.preventDefault();

                if(!id){
                    postNota(nota, limpar, errorHandler);
                    notify("Nota gravada!");
                } else{
                    console.log(nota);
                    putNota(nota, limpar, errorHandler);
                    notify("Nota atualizada!");
                }
            }
        }>
            {/* <Box align="center"> */}
            {/* <Box  align="left" width="25%"> */}
                <Box align="center" >
                <Typography component="h2" variant="h3" >Nota</Typography>

                <CampoId setValue={setId} value={id} onBlur={handleBusca}/>

                <InputLabel>Mentoria</InputLabel>
                <Select
                    onChange={(event) => {
                        setMentoria_id(event.target.value);
                    }}
                    id="select-mentoria"
                    value={mentoria_id}>
                        <MenuItem key={0} value={0}>None</MenuItem>
                    {mentorias.map((mentoria) => {
                        return (<MenuItem key={mentoria.id} value={mentoria.id}>
                            {`(${mentoria.id})  ${resizeString(mentoria.alunoDTO.nome)}
                             - ${resizeString(mentoria.mentorDTO.nome)}`}
                        </MenuItem>);
                    })}
                </Select>

                <InputLabel>Matéria</InputLabel>
                <div>
                    <Select
                        onChange={(event) => {
                            setMateria_id(event.target.value);
                        }}
                        id="select-materia"
                        value={materia_id}>
                            <MenuItem key={0} value={0}>None</MenuItem>
                        {materias.map((materia) => {
                            return (<MenuItem key={materia.id} value={materia.id}>{materia.nome}</MenuItem>);
                        })}
                    </Select>
                </div>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="datePicker"
                            label="Período da nota"
                            value={data}
                            onChange={
                                (date) => {
                                    setData(date);
                                }
                            }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>

                <div>
                    <TextField
                        onChange={
                            (event) => {
                                setPontuacao(Number(event.target.value.replace(',', '.')));
                            }
                        }
                        id="pontuacao"
                        label="Pontuação"
                        type="number"
                        value={pontuacao}
                    />
                </div>

                <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
            </Box>

            <AccordionGenerico label="Registros" onClick={() => atualizar()} components={[
                <TableGenerica id="tabela"
                    key={1}
                    colunas={["Código", "Mentoria", "Matéria", "Período da Nota", "Pontuação"]}
                    linhas={notas.map(nota => {
                        return {
                            id: nota.id,
                            mentoria: `${resizeStringWithSize(nota.mentoriaDTO.alunoDTO.nome, 20)}
                            - ${resizeStringWithSize(nota.mentoriaDTO.mentorDTO.nome, 20)}`,
                            materia: nota.materiaDTO.nome,
                            data: nota.data,
                            pontuacao: nota.pontuacao
                        }
                    })} />
            ]} />
        </form>
    );
}