import React, { useCallback } from 'react';
import { useState } from 'react';
import { TextField, Typography, Box } from '@material-ui/core';
import CampoId from '../CampoId';
import { useContext } from 'react';
import NotifyContext from '../../contexts/NotifyContext';
import { deleteByIdMentor, getByIdMentor, getMentor, postMentor, putMentor } from '../../model/MentorData';
import { useEffect } from 'react';
import BotoesCadastro from '../BotoesCadastro/BotoesCadastro';
import TableGenerica from '../Table/TableGenerica';
import AccordionGenerico from '../AccordionGenerico'

export default function Mentor() {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");

    const [mentores, setMentores] = useState([]);

    const [atualizou, setAtualizou] = useState(0);

    const { notify } = useContext(NotifyContext);

    const handleBusca = () => {
        getByIdMentor(Number(id), setEntity, errorHandler);
    }

    const setEntity = (retorno) => {
        setId(retorno.id);
        setNome(retorno.nome);
    }

    const errorHandler = useCallback((error) => {
        if (error.response) {
            notify(error.response.data.mensagem);
        }
    }, [notify]
    )

    const limpar = () => {
        setId(0);
        setNome("");
        atualizar();
    }

    const apagar = () => {
        deleteByIdMentor(id, () => {
            limpar();
            notify("Mentor excluído!");
        }, errorHandler);
    }

    const atualizar = () => {
        setAtualizou(atualizou + 1);
    }

    useEffect(() => {
        getMentor(setMentores, errorHandler);
    }, [atualizou, errorHandler]);

    return (
        <form onSubmit={(event) => {
            limpar();
            const mentor = { id: id, nome: nome };
            event.preventDefault();

            if (!id) {
                postMentor(mentor, limpar, errorHandler);
                notify("Mentor gravado!");
            } else {
                putMentor(mentor, id, limpar, errorHandler);
                notify("Mentor atualizado!");
            }
        }}>
            <Typography component="h2" variant="h3" align="center">Mentor</Typography>
            <Box align="center">
                <Box width="50vw">
                    <CampoId setValue={setId} value={id} onBlur={handleBusca} />
                    <TextField
                        id="nome"
                        label="Nome"
                        name="nome"
                        type="text"
                        value={nome}
                        onChange={(event) => {
                            setNome(event.target.value);
                        }}
                        margin="normal"
                        required
                        fullWidth
                    />
                    <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
                </Box>
            </Box>

            <AccordionGenerico label="Registros" onClick={() => atualizar()} components={[
                <TableGenerica
                    colunas={["Código", "Nome"]}
                    linhas={mentores}
                    key={1}
                />
            ]} />
        </form>
    );

}