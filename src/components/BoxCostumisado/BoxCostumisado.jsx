import { Box } from '@material-ui/core';

export default function BoxCostumisado({children}) {
    return (
        <Box align="center">
            <Box width="50vw">
                {children}
            </Box>
        </Box>
    );
}