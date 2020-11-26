
import {TextField} from '@material-ui/core';

export default function CampoTexto({ value, setValue, required=true, id, label, type ="text", maxSize = 255, validations = () => {return true} }) {
    return (
        <TextField
            onChange={(event) => {
                let text = event.target.value;

                if(text.length > maxSize){
                    text = text.slice(0, maxSize);
                }

                validations(text);

                setValue(text);
            }}
            value={value}
            id={id}
            label={label}
            type={type}
            margin="normal"
            required={required}
            fullWidth
        ></TextField>
    );
}