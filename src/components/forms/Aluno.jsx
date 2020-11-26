import React, { useCallback, useContext } from 'react';
import { TextField, Typography, Box } from "@material-ui/core";
import { useState } from 'react';
import { useEffect } from 'react';
import { getPrograma } from '../../model/ProgramaData'
import CampoId from '../CampoId';
import NotifyContext from '../../contexts/NotifyContext';
import { deleteByIdAluno, getAluno, getByIdAluno, postAluno, putAluno } from '../../model/AlunoData';
import AccordionGenerico from '../AccordionGenerico';
import TableGenerica from '../Table/TableGenerica';
import BotoesCadastro from '../BotoesCadastro/BotoesCadastro';
import ComboBox from '../ComboBox';
import CampoTexto from '../CampoTexto';


export default function Aluno() {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [classe, setClasse] = useState("");
    const [programa, setPrograma] = useState(0);

    const [alunos, setAlunos] = useState([]);
    const [programas, setProgramas] = useState([]);

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
        getAluno(setAlunos, errorHandler);
        getPrograma(setProgramas, errorHandler);
    }, [atualizou, errorHandler]);

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            const aluno = { id, nome, classe, programaDTO: {id: programa} };

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

                    <CampoTexto value={classe} setValue={setClasse} id="classe" label="Classe" required={false}/>

                    <ComboBox options={programas} setValue={setPrograma} label="Programa" value={programa} />

                    <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
                </Box>
            </Box>
            <AccordionGenerico label="Registros" onClick={() => atualizar()}
                components={[
                    <TableGenerica id="tabela"
                        colunas={["Código", "Nome", "Classe", "Programa"]}
                        key={1}
                        linhas={alunos.map(aluno => {
                            return {
                                id: aluno.id,
                                nome: aluno.nome,
                                classe: aluno.classe,
                                programa: `${aluno.programaDTO.id} / ${aluno.programaDTO.nome}`
                            }
                        })} />
                ]} />
        </form>)
}