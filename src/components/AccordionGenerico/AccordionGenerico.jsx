import React from 'react';
import {Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function AccordionGenerico({label, onClick, components}){
    return(<Accordion >
        <AccordionSummary
            onClick={() => onClick}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography>{label}</Typography>
        </AccordionSummary>
        <AccordionDetails>
                {components}
        </AccordionDetails>
    </Accordion>);
}