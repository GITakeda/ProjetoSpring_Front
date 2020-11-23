import React, { useContext } from 'react';
import { TextField, Button, Typography, Container, IconButton, MenuItem, Select, InputLabel, Box } from "@material-ui/core";
import { useState } from 'react';
import { useEffect } from 'react';
import { getPrograma, putPrograma } from '../../model/ProgramaData'
import CampoId from '../CampoId';
import NotifyContext from '../../contexts/NotifyContext';
import { deleteByIdAluno, getAluno, getByIdAluno, postAluno, putAluno } from '../../model/AlunoData';
import AccordionGenerico from '../AccordionGenerico';
import TableGenerica from '../Table/Table';
import BotoesCadastro from '../BotoesCadastro';

export default function Aluno() {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [classe, setClasse] = useState("");
    const [programa, setPrograma] = useState({ id: 0 });

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

    const errorHandler = (error) => {
        limpar();
        if (error.response) {
            notify(error.response.data.mensagem);
        }
    }

    const limpar = () => {
        setId(0);
        setNome("");
        setClasse("");
        setPrograma({id:0});
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
    }, [atualizou]);

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            const aluno = { id, nome, classe, programaDTO: programa };

            if(programa.id == 0){
                notify("Selecione um programa!");
                return;
            }

            limpar();

            if(!id){
                postAluno(aluno, limpar, errorHandler);
                notify("Aluno gravado!");
            } else{
                putAluno(aluno, id, errorHandler);
                notify("Aluno atualizado!");
            }
        }}>
            <Box align="center">
                <Typography component="h2" variant="h3" align="center">Aluno</Typography>

                <CampoId setValue={setId} value={id} onBlur={handleBusca} />

                <TextField
                    onChange={(event) => {
                        setNome(event.target.value);
                    }}
                    value={nome}
                    id="nome"
                    label="Nome"
                    type="text"
                    margin="normal"
                    required
                ></TextField>

                <div>
                    <TextField
                        onChange={(event) => {
                            setClasse(event.target.value);
                        }}
                        value={classe}
                        id="classe"
                        label="Classe"
                        type="text"
                        margin="normal"
                        required
                    ></TextField>
                </div>

                <InputLabel id="programas-label">Programa</InputLabel>
                <Select
                    labelId="programas-label"
                    onChange={(event) => {
                        setPrograma({id:event.target.value});
                    }}
                    id="select-programa"
                    required
                    value={programa.id}>
                        <MenuItem value={0} key={0}>None</MenuItem>
                    {programas.map((programa, index) => {
                        return (<MenuItem value={programa.id} key={index}>{programa.nome}</MenuItem>);
                    })}
                </Select>

                <BotoesCadastro type="submit" limpar={limpar} apagar={apagar} />
            </Box>
            <AccordionGenerico label="Registros" onClick={() => atualizar()}
                components={[
                    <TableGenerica id="tabela"
                        colunas={["Codigo", "Nome", "Classe", "Programa"]}
                        key={1}
                        linhas={alunos.map(aluno => {
                            return {
                            id:aluno.id,
                            nome:aluno.nome,
                            classe:aluno.classe,
                            programa:`${aluno.programaDTO.id} / ${aluno.programaDTO.nome}`
                        }})} />
                ]} />
        </form>)
}