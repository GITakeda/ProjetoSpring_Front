import React, { useCallback, useContext } from 'react';
import { Typography, Box, TableCell } from "@material-ui/core";
import { useState } from 'react';
import { useEffect } from 'react';
import { getByIdPrograma, getPrograma } from '../../model/ProgramaData'
import CampoId from '../CampoId';
import NotifyContext from '../../contexts/NotifyContext';
import { deleteByIdAluno, getAluno, getByIdAluno, postAluno, putAluno } from '../../model/AlunoData';
import AccordionGenerico from '../AccordionGenerico';
import TableGenerica from '../Table/TableGenerica';
import BotoesCadastro from '../BotoesCadastro/BotoesCadastro';
import ComboBox from '../ComboBox';
import CampoTexto from '../CampoTexto';
import CampoBusca from '../CampoBusca';


export default function Aluno() {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [classe, setClasse] = useState("");
    const [programa, setPrograma] = useState(0);
    const [programaDTO, setProgramaDTO] = useState({ id: 0 });

    const [teste, setTeste] = useState("");

    const [atualizou, setAtualizou] = useState(0);

    const { notify } = useContext(NotifyContext);

    const handleBusca = () => {
        getByIdAluno(Number(id), setEntity, errorHandler);
    }

    const setEntity = (retorno) => {
        setId(retorno.id);
        setNome(retorno.nome);
        setClasse(retorno.classe);
        setPrograma(retorno.programaDTO);
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
        setClasse("");
        setPrograma(0);
        atualizar();
    }

    const apagar = () => {
        deleteByIdAluno(id, () => {
            limpar();
            notify("Aluno excluído!");
        }, errorHandler);
    }

    const atualizar = () => {
        setAtualizou(atualizou + 1);
    }

    useEffect(() => {
    }, [atualizou, errorHandler]);

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            const aluno = { id, nome, classe, programaDTO: { id: programa } };

            if (programa.id == 0) {
                notify("Selecione um programa!");
                return;
            }

            limpar();

            if (!id) {
                postAluno(aluno, limpar, errorHandler);
                notify("Aluno gravado!");
            } else {
                putAluno(aluno, id, limpar, errorHandler);
                notify("Aluno atualizado!");
            }
        }}>
            <Typography component="h2" variant="h3" align="center">Aluno</Typography>
            <Box align="center">
                <Box width="50vw">

                    <CampoId setValue={setId} value={id} onBlur={handleBusca} />

                    <CampoTexto value={nome} setValue={setNome} id="nome" label="Nome" />

                    <CampoTexto value={classe} setValue={setClasse} id="classe" label="Classe" required={false} />

                    <CampoBusca setValue={setPrograma}
                        value={programa}
                        label="Programa"
                        onBlur={() => { getByIdPrograma(programa, setProgramaDTO, errorHandler) }}
                        getDescricao={() => { return programaDTO.nome }}
                        validations={ (value) => {
                            if(value.match(/\D/)){
                                return false;
                            }
                            return true;
                        }}
                    />

                    <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
                </Box>
            </Box>
            <AccordionGenerico label="Registros" onClick={() => atualizar()}
                components={[
                    <TableGenerica id="tabela"
                        colunas={[{ name: "Código", column: "id" }, { name: "Nome", column: "nome" }, { name: "Classe", column: "classe" }, { name: "Programa", column: "programa_id" }]}
                        key={1}
                        setEntity={setEntity}
                        valueTemplate={
                            {
                                id: 0,
                                nome: "",
                                classe: "",
                                programaDTO: { id: 0, nome: "" }
                            }
                        }
                        getValues={getAluno}
                        getDescricao={(value, index) => {
                            return (
                                <TableCell key={index}>{`${value.id} - ${value.nome}`}</TableCell>
                            )
                        }}
                    />
                ]} />
        </form>)
}