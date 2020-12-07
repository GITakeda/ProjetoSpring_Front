
import {TextField} from '@material-ui/core';

export default function CampoTexto({ value, setValue, required=true, id, label, type ="text", maxSize = 255, validations = () => {return true}, onFocus = () => {} }) {
    return (
        <TextField
            onChange={(event) => {
                let text = event.target.value;

                if(text.length > maxSize){
                    text = text.slice(0, maxSize);
                }

                if(!validations(text)){
                    return;
                }

                setValue(text);
            }}
            onFocus={() => {
                onFocus();
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