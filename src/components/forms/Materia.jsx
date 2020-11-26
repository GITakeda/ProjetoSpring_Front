import React, { useCallback, useContext } from 'react';
import { TextField, Typography, Box } from "@material-ui/core";
import { useState } from 'react';
import CampoId from '../CampoId';
import NotifyContext from '../../contexts/NotifyContext';
import { deleteByIdMateria, getByIdMateria, getMateria, postMateria, putMateria } from '../../model/MateriaData';
import { useEffect } from 'react';
import BotoesCadastro from '../BotoesCadastro/BotoesCadastro';
import AccordionGenerico from '../AccordionGenerico';
import TableGenerica from '../Table/TableGenerica'
import CampoTexto from '../CampoTexto';

export default function Materia() {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    const [materias, setMaterias] = useState([]);

    const [atualizou, setAtualizou] = useState(0);

    const { notify } = useContext(NotifyContext);

    const handleBusca = () => {
        getByIdMateria(Number(id), setEntity, errorHandler);
    }

    const setEntity = (retorno) => {
        setId(retorno.id);
        setNome(retorno.nome);
        setDescricao(retorno.descricao);
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
        setDescricao("");
        atualizar();
    }

    const apagar = () => {
        deleteByIdMateria(id, () => {
            limpar();
            notify("Matería excluída");
        }, errorHandler);
    }

    const atualizar = () => {
        setAtualizou(atualizou + 1);
    }

    useEffect(() => {
        getMateria(setMaterias, errorHandler);
    }, [atualizou, errorHandler]);

    return (
        <form onSubmit={(event) => {
            limpar();
            const materia = { id: id, nome: nome, descricao: descricao };
            event.preventDefault();

            if (!id) {
                postMateria(materia,
                    () => {
                        limpar();
                        notify("Matéria gravada!");
                    }
                    , errorHandler);
            } else {
                putMateria(materia, id, limpar, errorHandler);
                notify("Matéria atualizada!");
            }
        }}>
            <Typography component="h2" variant="h3" align="center">Matéria</Typography>
            <Box align="center">
                <Box width="50vw">

                    <CampoId setValue={setId} value={id} onBlur={handleBusca} />

                    <CampoTexto value={nome} setValue={setNome} id="nome" label="Nome"/>

                    <CampoTexto value={descricao} setValue={setDescricao} id="descricao" label="Descrição"/>

                    <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
                </Box>
            </Box>

            <AccordionGenerico label="Registros" onClick={() => atualizar()}
                        components={
                            [
                                <TableGenerica id="tabela"
                                    colunas={["Código", "Nome", "Descrição"]}
                                    linhas={materias}
                                    key={1}
                                />
                            ]
                        }
                    />
        </form>)
}