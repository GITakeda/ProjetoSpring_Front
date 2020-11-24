import React, {useContext} from 'react';
import { TextField, Button, Typography, Container, IconButton, Box } from "@material-ui/core";
import { useState } from 'react';
import CampoId from '../CampoId';
import NotifyContext from '../../contexts/NotifyContext';
import { deleteByIdMateria, getByIdMateria, getMateria, postMateria, putMateria } from '../../model/MateriaData';
import { useEffect } from 'react';
import BotoesCadastro from '../BotoesCadastro';
import AccordionGenerico from '../AccordionGenerico';
import TableGenerica from '../Table/TableGenerica'

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

    const errorHandler = (error) => {
        limpar();
        if (error.response) {
            notify(error.response.data.mensagem);
        }
    }

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
    }, [atualizou]);

    return (
        <form onSubmit={(event) => {
            limpar();
            const materia = { id: id, nome: nome, descricao: descricao };
            event.preventDefault();

            if (!id) {
                postMateria(materia, limpar, errorHandler);
                notify("Matéria gravada!");
            } else {
                putMateria(materia, id, limpar, errorHandler);
                notify("Matéria atualizada!");
            }
        }}>
            <Box align="center">
                <Typography component="h2" variant="h3" align="center">Matéria</Typography>

                <CampoId setValue={setId} value={id} onBlur={handleBusca}/>

                <TextField
                    onChange={(event) => {
                        setNome(event.target.value);
                    }}
                    id="nome"
                    label="Nome"
                    type="text"
                    margin="normal"
                    value={nome}
                    required
                ></TextField>

                <div>
                    <TextField
                        onChange={(event) => {
                            setDescricao(event.target.value);
                        }}
                        id="descricao"
                        label="Descrição"
                        type="text"
                        margin="normal"
                        value={descricao}
                        required
                    />
                </div>

                <BotoesCadastro type="submit" limpar={limpar} apagar={apagar}/>

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
            </Box>
        </form>)
}