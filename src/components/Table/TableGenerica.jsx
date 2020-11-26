import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, TablePagination, TableFooter } from '@material-ui/core'
import './index.css';
import { useState } from 'react';

export default function TableGenerica({ colunas, linhas }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getPages = (rows) => {
        if (rows.length > 0) {
            let rowsStartPosition = page * rowsPerPage;
            let rowsEndPosition = rowsStartPosition + rowsPerPage;
            return linhas.slice(rowsStartPosition, rowsEndPosition);
        }

        return linhas;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead >
                    <TableRow>
                        {colunas.map((q, index) => {
                            return <TableCell key={index} className="table-head-cell" style={{ color: 'white' }}>{q}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        getPages(linhas).map((l, index) => {
                            return <TableRow key={index}>{Object.values(l).map((valor, index) => {
                                return <TableCell key={index}>{valor}</TableCell>
                            })}</TableRow>
                        })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={linhas.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}