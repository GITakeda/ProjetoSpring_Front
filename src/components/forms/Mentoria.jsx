import { Box, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAluno } from '../../model/AlunoData';
import { getMentor } from '../../model/MentorData';
import { deleteByIdMentoria, getByIdMentoria, getMentoria, postMentoria } from '../../model/MentoriaData';
import CampoId from '../CampoId';
import NotifyContext from '../../contexts/NotifyContext'
import BotoesCadastro from '../BotoesCadastro';
import AccordionGenerico from '../AccordionGenerico';
import TableGenerica from '../Table/TableGenerica'
import { postPrograma } from '../../model/ProgramaData';

export default function Mentoria() {

    const [id, setId] = useState(0);
    const [aluno_id, setAluno_id] = useState(0);
    const [mentor_id, setMentor_id] = useState(0);

    const [mentorias, setMentorias] = useState([]);

    const [alunos, setAlunos] = useState([]);
    const [mentores, setMentores] = useState([]);

    const [atualizou, setAtualizou] = useState(0);

    const { notify } = useContext(NotifyContext);

    const handleBusca = () => {
        getByIdMentoria(Number(id), setEntity, errorHandler);
    }

    const setEntity = (retorno) => {
        setId(retorno.id);
        setAluno_id(retorno.alunoDTO.id);
        setMentor_id(retorno.mentorDTO.id);
    }

    const errorHandler = (error) => {
        limpar();
        if (error.response) {
            notify(error.response.data.mensagem);
        }
    }

    const limpar = () => {
        setId(0);
        setMentor_id(0);
        setAluno_id(0);
        atualizar();
    }

    const apagar = () => {
        deleteByIdMentoria(id, () => {
            limpar();
            notify("Mentoria excluída!");
        }, errorHandler);
    }

    const atualizar = () => {
        setAtualizou(atualizou + 1);
    }

    useEffect(() => {
        getMentoria(setMentorias, errorHandler);
        getAluno(setAlunos, errorHandler);
        getMentor(setMentores, errorHandler);
    }, [atualizou]);

    return (
        <form onSubmit={
            (event) => {
                limpar();
                const mentoria = {id: id, alunoDTO:{id: aluno_id}, mentorDTO:{id: mentor_id}};
                event.preventDefault();

                if(!id){
                    postMentoria(mentoria, () => {
                        limpar()
                        notify("Mentoria gravada");
                    }, errorHandler);
                }

            }
        }>
            <Box align="center" >
                <Typography component="h2" variant="h3" align="center">Mentoria</Typography>

                <CampoId setValue={setId} value={id} onBlur={handleBusca}/>

                <InputLabel>Aluno</InputLabel>
                <Select
                    onChange={(event) => {
                        setAluno_id(event.target.value);
                    }}
                    id="select-aluno"
                    value={aluno_id}>
                        <MenuItem key={0} value={0}>None</MenuItem>
                    {alunos.map((aluno, index) => {
                        return (<MenuItem key={aluno.id} value={aluno.id}>{aluno.nome}</MenuItem>);
                    })}
                </Select>

                <InputLabel>Mentor</InputLabel>
                <Select
                    onChange={(event) => {
                        setMentor_id(event.target.value);
                    }}
                    id="select-mentor"
                    value={mentor_id}>
                        <MenuItem key={0} value={0}>None</MenuItem>
                    {mentores.map((mentor, index) => {
                        return (<MenuItem key={mentor.id} value={mentor.id}>{mentor.nome}</MenuItem>);
                    })}
                </Select>

                <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
            </Box>

            <AccordionGenerico label="Registros" onClick={() => atualizar()} components={[
                <TableGenerica id="tabela"
                    key={1}
                    colunas={["Código", "Aluno", "Mentor"]}
                    linhas={
                        mentorias.map(q => {
                            return {
                                id: q.id,
                                aluno: `${q.alunoDTO.nome} / ${q.alunoDTO.id}`,
                                mentor: `${q.mentorDTO.nome} / ${q.mentorDTO.id}`
                            }
                        })
                    }
                />
            ]} />

        </form>
    );


}