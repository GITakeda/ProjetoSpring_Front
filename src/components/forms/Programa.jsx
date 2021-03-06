import { Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useState } from 'react';
import CampoId from '../CampoId';
import { getPrograma, getByIdPrograma, postPrograma, deleteByIdPrograma, putPrograma } from '../../model/ProgramaData';
import TableGenerica from '../Table/TableGenerica';
import { useEffect } from 'react';
import BotoesCadastro from '../BotoesCadastro';
import NotifyContext from '../../contexts/NotifyContext'

import AccordionGenerico from '../AccordionGenerico'
import { useContext } from 'react';
import CampoTexto from '../CampoTexto';
import BoxCostumisado from '../BoxCostumisado';

export default function Programa() {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [ano, setAno] = useState("");

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
            limpar();
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
    }, [atualizou, errorHandler]);

    return (
        <form onSubmit={(event) => {
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
            <BoxCostumisado>
                    <CampoId setValue={setId} value={id} onBlur={handleBusca} />

                    <CampoTexto value={nome} setValue={setNome} id="nome" label="Nome" />

                    <CampoTexto value={ano} setValue={setAno} id="ano" label="Ano" type="number" maxSize={4} />

                    <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
            </BoxCostumisado>

            <AccordionGenerico label="Registros" onClick={() => atualizar()} components={[
                <TableGenerica id="tabela"
                    atualizou={atualizou}
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
                    setEntity={setEntity}
                />
            ]} />
        </form>
    );

}