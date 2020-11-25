import {InputLabel, Select, MenuItem, Box, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: "1vw 0vw 0vw 0vw",
        },
    },
}))

export default function ComboBox ({options, setValue, label, value, campoDescricao = (option) => {return option.nome}}){
    return (
        <Box align="left" >
            <Box className={useStyles().root}>
            <InputLabel id="comboLabel" >{label}</InputLabel>
            </Box>
            <Select
                
                labelId="comboLabel"
                onChange={(event) => {
                    setValue(event.target.value );
                }}
                required
                fullWidth
                value={value}>
                <MenuItem value={0} key={0}>None</MenuItem>
                {
                options.map((option, index) => {
                    return (<MenuItem  value={option.id} key={index}>{campoDescricao(option)}</MenuItem>);
                })}
            </Select>
        </Box>
    );
}