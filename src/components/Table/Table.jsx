import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@material-ui/core'
import './index.css';

export default function TableGenerica({ colunas, linhas }) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead >
                    <TableRow>
                        {colunas.map((q, index) => {
                            return <TableCell key={index} className="table-head-cell" style={{color:'white'}}>{q}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {linhas.map((l, index) => {
                        return <TableRow key={index}>{Object.values(l).map((valor, index) => {
                            return <TableCell key={index}>{valor}</TableCell>
                        })}</TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}