import { TextField, Box, Typography, FormLabel } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useState } from 'react';
import CampoId from '../CampoId';
import { getByIdMentoria, getMentoria } from '../../model/MentoriaData'
import { getByIdMateria, getMateria } from '../../model/MateriaData'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useEffect } from 'react';
import { useContext } from 'react';
import NotifyContext from '../../contexts/NotifyContext';
import { deleteByIdNota, getByIdNota, getNota, postNota, putNota } from '../../model/NotaData';
import BotoesCadastro from '../BotoesCadastro/BotoesCadastro';
import AccordionGenerico from '../AccordionGenerico';
import TableGenerica from '../Table/TableGenerica';
import ComboBox from '../ComboBox';
import CampoTexto from '../CampoTexto'

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

    const errorHandler = useCallback((error) => {
        if (error.response) {
            limpar();
            notify(error.response.data.mensagem);
        }
    }, [notify]
    )

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
    }, [atualizou, errorHandler]);

    return (
        <form onSubmit={
            (event) => {
                const nota = {
                    id: id,
                    mentoriaDTO: { id: Number(mentoria_id) },
                    materiaDTO: { id: Number(materia_id) },
                    data: (new Date(data)).toJSON(),
                    pontuacao: pontuacao
                }

                event.preventDefault();

                if(data == "Invalid Date"){
                    notify("Data inválida!");
                    return;
                }

                if (!id) {
                    postNota(nota, limpar, errorHandler);
                    notify("Nota gravada!");
                } else {
                    putNota(nota, id, limpar, errorHandler);
                    notify("Nota atualizada!");
                }

                limpar();
            }
        }>
            <Typography component="h2" variant="h3" align="center" >Nota</Typography>
            <Box align="center">
                <Box width="50vw">

                    <CampoId setValue={setId} value={id} onBlur={handleBusca} />

                    {/* <CampoId setValue={setMentoria_id} value={mentoria_id} onBlur={() => {
                        getByIdMentoria(Number(mentoria_id), setMentoria_id, errorHandler);
                    }} label="Mentoria" />
                    <Box align="left">
                <FormLabel>{mentoria_id}</FormLabel>
                    </Box> */}

                    <ComboBox options={mentorias} setValue={setMentoria_id} label="Mentoria" value={mentoria_id} campoDescricao={(option) => {
                        return `(${option.id})  ${resizeString(option.alunoDTO.nome)}
                        - ${resizeString(option.mentorDTO.nome)}`
                    }} />

                    {/* <CampoId setValue={setMateria_id} value={materia_id} onBlur={(id) => {
                        getByIdMateria(Number(materia_id), setMateria_id, errorHandler);
                    }} label="Matéria" /> */}

                    <ComboBox setValue={setMateria_id} value={materia_id} options={materias} label="Matéria" />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="datePicker"
                            label="Período da nota"
                            value={data}
                            fullWidth
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
                    
                    <CampoTexto value={pontuacao} setValue={setPontuacao} id="pontuacao" label="Pontuação" type="number" maxSize={10}/>

                    <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
                </Box>
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
                            data: `${nota.data[2]}/${nota.data[1]}/${nota.data[0]}`,
                            pontuacao: nota.pontuacao
                        }
                    })} />
            ]} />
        </form>
    );
}