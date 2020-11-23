import useStyles from './forms/style/buttons';
import {Button} from '@material-ui/core';

export default function BotoesCadastro({limpar, apagar}) {
    return (
        <div className={useStyles().root}>
            <Button variant="outlined" type="submit" >Cadastrar</Button>
            <Button variant="outlined" onClick={() => { limpar() }}>Limpar</Button>
            <Button variant="outlined" color="secondary" onClick={() => { apagar() }} >Apagar</Button>
        </div>
    );
}