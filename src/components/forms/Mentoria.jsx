import { TableCell, Typography } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getByIdAluno } from '../../model/AlunoData';
import { getByIdMentor } from '../../model/MentorData';
import { deleteByIdMentoria, getByIdMentoria, getMentoria, postMentoria } from '../../model/MentoriaData';
import CampoId from '../CampoId';
import NotifyContext from '../../contexts/NotifyContext'
import BotoesCadastro from '../BotoesCadastro';
import AccordionGenerico from '../AccordionGenerico';
import TableGenerica from '../Table/TableGenerica'
import CampoBusca from '../CampoBusca';
import BoxCostumisado from '../BoxCostumisado';

export default function Mentoria() {

    const [id, setId] = useState(0);
    const [aluno_id, setAluno_id] = useState(0);
    const [mentor_id, setMentor_id] = useState(0);
    const [alunoDTO, setAlunoDTO] = useState({nome: ""});
    const [mentorDTO, setMentorDTO] = useState({nome: ""});

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
            limpar();
            notify(error.response.data.mensagem);
        }
    }, [notify]
    )

    const errorHandlerAluno = useCallback((error) => {
        if (error.response) {
            setAlunoDTO({id: 0});
            setAluno_id(0);
            notify(error.response.data.mensagem);
        }
    }, [notify]
    )

    const errorHandlerMentor = useCallback((error) => {
        if (error.response) {
            setMentorDTO({id: 0});
            setMentor_id(0);
            notify(error.response.data.mensagem);
        }
    }, [notify]
    )

    const limpar = () => {
        setId(0);
        setMentor_id(0);
        setAluno_id(0);
        setMentorDTO({id: 0});
        setAlunoDTO({id: 0});
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
    }, [atualizou, errorHandler]);

    return (
        <form onSubmit={
            (event) => {
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
            <BoxCostumisado>
                    <CampoId setValue={setId} value={id} onBlur={handleBusca} />

                    <CampoBusca setValue={setAluno_id}
                        value={aluno_id}
                        label="Aluno"
                        placeHolder="Insira o id de um aluno"
                        onBlur={() => { getByIdAluno(aluno_id, setAlunoDTO, errorHandlerAluno) }}
                        getDescricao={() => { return alunoDTO.nome }}

                    />

                    <CampoBusca setValue={setMentor_id}
                        value={mentor_id}
                        label="Mentor"
                        placeHolder="Insira o id de um mentor"
                        onBlur={() => { getByIdMentor(mentor_id, setMentorDTO, errorHandlerMentor) }}
                        getDescricao={() => { return mentorDTO.nome }}
                        validations={ (value) => {
                            if(value.match(/\D/)){
                                return false;
                            }
                            return true;
                        }}
                    />

                    <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
            </BoxCostumisado>

            <AccordionGenerico label="Registros" onClick={() => atualizar()} components={[
                <TableGenerica id="tabela"
                    key={1}
                    atualizou={atualizou}
                    colunas={[
                        { name: "Código", column: "id" },
                        { name: "Aluno", column: "aluno_id" },
                        { name: "Mentor", column: "mentor_id" }
                    ]}
                    valueTemplate={
                        {
                            id: 0,
                            aluno_id: 0,
                            mentor_id: 0
                        }
                    }
                    getValues={getMentoria}
                    setEntity={setEntity}
                    getDescricao={(value, index) => {
                        return <TableCell key={index}>{`${value.id} - ${value.nome}`}</TableCell>
                    }}
                />
            ]} />

        </form>
    );


}