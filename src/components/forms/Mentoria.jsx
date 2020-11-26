import { Box, Typography } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAluno } from '../../model/AlunoData';
import { getMentor } from '../../model/MentorData';
import { deleteByIdMentoria, getByIdMentoria, getMentoria, postMentoria } from '../../model/MentoriaData';
import CampoId from '../CampoId';
import NotifyContext from '../../contexts/NotifyContext'
import BotoesCadastro from '../BotoesCadastro/BotoesCadastro';
import AccordionGenerico from '../AccordionGenerico';
import TableGenerica from '../Table/TableGenerica'
import ComboBox from '../ComboBox';

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

    const errorHandler = useCallback((error) => {
        if (error.response) {
            notify(error.response.data.mensagem);
        }
    }, [notify]
    )

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
    }, [atualizou, errorHandler]);

    return (
        <form onSubmit={
            (event) => {
                limpar();
                const mentoria = { id: id, alunoDTO: { id: aluno_id }, mentorDTO: { id: mentor_id } };
                event.preventDefault();

                if (!id) {
                    postMentoria(mentoria, () => {
                        limpar()
                        notify("Mentoria gravada");
                    }, errorHandler);
                }
            }
        }>
            <Typography component="h2" variant="h3" align="center">Mentoria</Typography>
            <Box align="center">
                <Box width="50vw">
                    <CampoId setValue={setId} value={id} onBlur={handleBusca} />

                    <ComboBox options={alunos} setValue={setAluno_id} label="Aluno" value={aluno_id} />
                    <ComboBox options={mentores} value={mentor_id} setValue={setMentor_id} label="Mentor" />

                    <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
                </Box>
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