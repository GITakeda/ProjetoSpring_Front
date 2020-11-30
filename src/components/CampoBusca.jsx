import React from 'react';
import { Box, InputLabel, TextField } from '@material-ui/core'

export default function CampoBusca({ setValue, value, onBlur, label, id, type, getDescricao, validations = (value) => true }) {
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