import React from 'react';
import { Box, InputLabel, TextField } from '@material-ui/core'

export default function CampoBusca({ setValue, value, onBlur, label, id, type, getDescricao = () => {return ""}, validations = (value) => true, placeHolder }) {
    return (
        <Box align="left">
            <TextField
                onChange={(event) => {
                    if(!validations(event.target.value)){
                        return;
                    }

                    setValue(event.target.value);
                }}
                onBlur={() => {
                    onBlur();
                }}
                onFocus={(event) => {
                    setValue("");
                }}
                placeholder={placeHolder}
                value={value}
                id={id}
                label={label}
                type={type}
                margin="normal"
                fullWidth
            ></TextField>
            <InputLabel >{getDescricao()}</InputLabel>
        </Box>
    );
}