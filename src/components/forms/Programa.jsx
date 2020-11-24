import { TextField, Typography, Box } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import CampoId from '../CampoId';
import {getPrograma, getByIdPrograma, postPrograma, deleteByIdPrograma, putPrograma} from '../../model/ProgramaData';
import TableGenerica from '../Table/TableGenerica';
import { useEffect } from 'react';
import BotoesCadastro from '../BotoesCadastro'
import NotifyContext from '../../contexts/NotifyContext'

import AccordionGenerico from '../AccordionGenerico'
import { useContext } from 'react';

export default function Programa() {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [ano, setAno] = useState("");

    const [programas, setProgramas] = useState([]);

    const [atualizou, setAtualizou] = useState(0);

    const {notify} = useContext(NotifyContext);

    const handleBusca = () => {
        getByIdPrograma(Number(id), setEntity, errorHandler);
    }

    const setEntity = (retorno) => {
        setId(retorno.id);
        setNome(retorno.nome);
        setAno(retorno.ano);
    }

    const errorHandler = (error) => {
        limpar();
        if (error.response) {
            notify(error.response.data.mensagem);
        }
    }

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
    }, [atualizou]);

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
            <Box align="center" >
                <Typography component="h2" variant="h3" align="center">Programa</Typography>

                <CampoId setValue={setId} value={id} onBlur={handleBusca} />

                <TextField
                    onChange={(event) => setNome(event.target.value)}
                    id="nome"
                    name="nome"
                    label="Nome"
                    type="text"
                    margin="normal"
                    required
                    value={nome}
                />

                <div >
                    <TextField
                        onChange={(event) => setAno(event.target.value)}
                        id="ano"
                        name="ano"
                        label="Ano"
                        type="number"
                        margin="normal"
                        required
                        value={ano}
                    />
                </div>

                <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
            </Box>

            <AccordionGenerico label="Registros" onClick={() => atualizar()} components={[
                            <TableGenerica id="tabela"
                            colunas={["Código", "Nome", "Ano"]}
                            linhas={programas}
                            key={1}
                            />
                            ]}/>
        </form>
    );

}