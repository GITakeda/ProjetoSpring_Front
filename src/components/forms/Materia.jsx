import React, { useCallback, useContext } from 'react';
import { Typography } from "@material-ui/core";
import { useState } from 'react';
import CampoId from '../CampoId';
import NotifyContext from '../../contexts/NotifyContext';
import { deleteByIdMateria, getByIdMateria, getMateria, postMateria, putMateria } from '../../model/MateriaData';
import BotoesCadastro from '../BotoesCadastro';
import AccordionGenerico from '../AccordionGenerico';
import TableGenerica from '../Table/TableGenerica'
import CampoTexto from '../CampoTexto';
import BoxCostumisado from '../BoxCostumisado';

export default function Materia() {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

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
            limpar();
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

    return (
        <form onSubmit={(event) => {
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
            <BoxCostumisado>
                    <CampoId setValue={setId} value={id} onBlur={handleBusca} />

                    <CampoTexto value={nome} setValue={setNome} id="nome" label="Nome"/>

                    <CampoTexto value={descricao} setValue={setDescricao} id="descricao" label="Descrição"/>

                    <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
            </BoxCostumisado>

            <AccordionGenerico label="Registros" onClick={() => atualizar()}
                        components={
                            [
                                <TableGenerica id="tabela"
                                    atualizou = {atualizou}
                                    colunas={[
                                        {name: "Código", column: "id"}, 
                                        {name: "Nome", column: "nome"}, 
                                        {name: "Descrição", column: "descricao"}]}
                                    setEntity={setEntity}
                                    valueTemplate={
                                        {
                                            id: 0,
                                            nome: "",
                                            descricao: ""
                                        }
                                    }
                                    getValues={getMateria}
                                    key={1}
                                />
                            ]
                        }
                    />
        </form>)
}