import React from 'react';
import { Box, TextField } from '@material-ui/core'

export default function CampoId({ setValue, value, onBlur }) {
    return (
        <Box>
            <TextField
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                onBlur={(event) => {
                    onBlur();
                }} 
                onFocus={(event) => {
                    setValue("");
                }}
                value={value}
                id="id"
                label="Id"
                type="number"
                margin="normal"
                fullWidth
            ></TextField>
        </Box>
    );
}