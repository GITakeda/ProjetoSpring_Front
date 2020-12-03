import { Box, Typography, TableCell } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useState } from 'react';
import CampoId from '../CampoId';
import { getByIdMentoria } from '../../model/MentoriaData'
import { getByIdMateria } from '../../model/MateriaData'
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
import CampoTexto from '../CampoTexto'
import CampoBusca from '../CampoBusca'

export default function Nota() {

    const [id, setId] = useState(0);
    const [materia_id, setMateria_id] = useState(0);
    const [mentoria_id, setMentoria_id] = useState(0);
    const [data, setData] = useState(Date.now);
    const [pontuacao, setPontuacao] = useState(0.0);

    const [materia, setMateria] = useState({ id: 0, nome: "" });
    const [mentoria, setMentoria] = useState({ id: 0, alunoDTO: { nome: "" }, mentorDTO: { nome: "" } });

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

    const errorHandlerMentoria = useCallback((error) => {
        if (error.response) {
            setMentoria({id: 0});
            setMentoria_id(0);
            notify(error.response.data.mensagem);
        }
    }, [notify]
    )

    const errorHandlerMateria = useCallback((error) => {
        if (error.response) {
            setMateria({id: 0});
            setMateria_id(0);
            notify(error.response.data.mensagem);
        }
    }, [notify]
    )

    const limpar = () => {
        setId(0);
        setMateria_id(0);
        setMentoria_id(0);
        setMateria({id: 0});
        setMentoria({id: 0});
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

                if (data == "Invalid Date") {
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
            }
        }>
            <Typography component="h2" variant="h3" align="center" >Nota</Typography>
            <Box align="center">
                <Box width="50vw">

                    <CampoId setValue={setId} value={id} onBlur={handleBusca} />

                    <CampoBusca setValue={setMentoria_id} value={mentoria_id} label="Mentoria"
                        placeHolder="Insira o id de uma mentoria"
                        
                        onBlur={
                            () => {
                                setMentoria({ id: 0, alunoDTO: { nome: "" }, mentorDTO: { nome: "" } });
                                getByIdMentoria(mentoria_id, setMentoria, errorHandlerMentoria);
                            }}
                        getDescricao={
                            () => {

                                if (!mentoria.alunoDTO || mentoria.alunoDTO.nome === "") {
                                    return "";
                                }

                                return `(${mentoria.id})  ${resizeString(mentoria.alunoDTO.nome)}
                        - ${resizeString(mentoria.mentorDTO.nome)}`
                            }}
                    ></CampoBusca>

                    <CampoBusca setValue={setMateria_id} value={materia_id} label="Matéria" onBlur={
                        () => {
                            setMateria({ id: 0, nome: "" });
                            getByIdMateria(materia_id, setMateria, errorHandlerMateria);
                        }}
                        placeHolder="Insira o id de uma matéria"
                        getDescricao={
                            () => {
                                return materia.nome;
                            }
                        }
                    ></CampoBusca>

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

                    <CampoTexto value={pontuacao} setValue={setPontuacao} onFocus={() => {setPontuacao("")}} id="pontuacao" label="Pontuação" type="number" maxSize={10} />

                    <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
                </Box>
            </Box>

            <AccordionGenerico label="Registros" onClick={() => atualizar()} components={[
                <TableGenerica id="tabela"
                    atualizou={atualizou}
                    key={1}
                    colunas={[
                        { name: "Código", column: "id" },
                        { name: "Mentoria", column: "mentoria_id" },
                        { name: "Matéria", column: "materia_id" },
                        { name: "Período da Nota", column: "data" },
                        { name: "Pontuação", column: "pontuacao" }]}
                    valueTemplate={
                        {
                            id: 0,
                            mentoriaDTO: { alunoDTO: { nome: "" }, mentorDTO: { nome: "" } },
                            materiaDTO: { nome: "" },
                            data: "",
                            pontuacao: 0
                        }
                    }
                    setEntity={setEntity}
                    getValues={getNota}
                    getDescricao={(value, index) => {
                        
                        switch(index){
                            case 1:
                                return <TableCell key={index}>{`${resizeStringWithSize(value.alunoDTO.nome, 20)}
                        - ${resizeStringWithSize(value.mentorDTO.nome, 20)}`}</TableCell>
                            case 2:
                                return <TableCell key={index}>{value.nome}</TableCell>
                            case 3:
                                return <TableCell key={index}>{`${value[2]} - ${value[1]} - ${value[0]}`}</TableCell>
                            default:
                                return <></>;
                        }
                    }}
                />
            ]} />
        </form>
    );
}