import useStyles from './style/buttons';
import {Box, Button} from '@material-ui/core';

export default function BotoesCadastro({limpar, apagar}) {
    return (
        <Box className={useStyles().root}>
            <Button variant="outlined" type="submit" id="btnCadastrar">Cadastrar</Button>
            <Button variant="outlined" onClick={() => { limpar() }} id="btnLimpar">Limpar</Button>
            <Button variant="outlined" color="secondary" onClick={() => { apagar() }} id="btnApagar">Apagar</Button>
        </Box>
    );
}