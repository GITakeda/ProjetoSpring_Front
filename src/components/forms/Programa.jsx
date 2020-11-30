import { TextField, Typography, Box } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useState } from 'react';
import CampoId from '../CampoId';
import { getPrograma, getByIdPrograma, postPrograma, deleteByIdPrograma, putPrograma } from '../../model/ProgramaData';
import TableGenerica from '../Table/TableGenerica';
import { useEffect } from 'react';
import BotoesCadastro from '../BotoesCadastro/BotoesCadastro';
import NotifyContext from '../../contexts/NotifyContext'

import AccordionGenerico from '../AccordionGenerico'
import { useContext } from 'react';
import CampoTexto from '../CampoTexto';

export default function Programa() {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [ano, setAno] = useState("");

    const [programas, setProgramas] = useState([]);

    const [atualizou, setAtualizou] = useState(0);

    const { notify } = useContext(NotifyContext);

    const handleBusca = () => {
        getByIdPrograma(Number(id), setEntity, errorHandler);
    }

    const setEntity = (retorno) => {
        setId(retorno.id);
        setNome(retorno.nome);
        setAno(retorno.ano);
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
        setAno("");
        atualizar();
    }

    const apagar = () => {
        deleteByIdPrograma(id, () => {
            limpar();
            notify("Programa excluído!");
        }, errorHandler);
    }

    const atualizar = () => {
        setAtualizou(atualizou + 1);
    }

    useEffect(() => {
        getPrograma(setProgramas, errorHandler);
    }, [atualizou, errorHandler]);

    return (
        <form onSubmit={(event) => {
            limpar();
            const programa = { id: id, nome: nome, ano: ano };
            event.preventDefault();

            if (!id) {
                postPrograma(programa, limpar, errorHandler);
                notify("Programa gravado!");
            } else {
                putPrograma(programa, id, limpar, errorHandler);
                notify("Programa atualizado!");
            }
        }
        }>
            <Typography component="h2" variant="h3" align="center">Programa</Typography>
            <Box align="center">
                <Box width="50vw">

                    <CampoId setValue={setId} value={id} onBlur={handleBusca} />

                    <CampoTexto value={nome} setValue={setNome} id="nome" label="Nome" />

                    <CampoTexto value={ano} setValue={setAno} id="ano" label="Ano" type="number" maxSize={4} />

                    <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
                </Box>
            </Box>

            <AccordionGenerico label="Registros" onClick={() => atualizar()} components={[
                <TableGenerica id="tabela"
                    colunas={[
                        { name: "Código", column: "id" },
                        { name: "Nome", column: "nome" },
                        { name: "Ano", column: "ano" }
                    ]}
                    key={1}
                    valueTemplate={
                        {
                            id: 0,
                            nome: "",
                            ano: ""
                        }
                    }
                    getValues={getPrograma}
                />
            ]} />
        </form>
    );

}