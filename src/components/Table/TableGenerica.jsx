import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, TablePagination, TableFooter, TableSortLabel } from '@material-ui/core'
import './index.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function TableGenerica({ colunas, getValues = (setValues, page, rowsPerPage, sort, direction, error) => { return [] }, valueTemplate, getDescricao = (value) => { return <TableCell></TableCell> }, setEntity = (entity) => { }, atualizou }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [values, setValues] = useState({ content: [valueTemplate] });
    const [sort, setSort] = useState("");
    const [direction, setDirection] = useState("asc");

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (columnId) => {
        if(columnId === sort){
            if(direction === "desc"){
                setSort("");
                setDirection("asc");
                return;
            }
            setDirection("desc");
        } else{
            setDirection("asc");
        }

        setSort(columnId);
    }

    useEffect(() => {
        getValues(setValues, page, rowsPerPage, sort, direction);
    }, [atualizou, page, rowsPerPage, sort, direction, getValues]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead >
                    <TableRow>
                        {colunas.map((q, index) => {
                            return <TableCell key={index} className="table-head-cell" style={{ color: 'white' }}>
                                <TableSortLabel style={{ color: 'white' }} direction={direction}
                                    onClick={
                                        () => {
                                            handleSort(q.column)
                                        }
                                    } active={sort === q.column} >{q.name}</TableSortLabel>
                            </TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        values.content.map((l, index) => {
                            return <TableRow key={index} onClick={() => {
                                setEntity(l);
                            }}>{
                                    Object.values(l).map((item, index) => {
                                        if (typeof item == 'object') {
                                            return getDescricao(item, index);
                                        }

                                        return <TableCell key={index}>{item}</TableCell>
                                    })
                                }
                            </TableRow>
                        })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 15, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={Number(values.totalElements)}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true
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