import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { adminContext } from '../contexts/AdminContext';
import { Button, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BasicTable() {
    const { getAllPhone, phones, deletePhone } = React.useContext(adminContext)
    React.useEffect(() => {
        getAllPhone()
    }, [])
    function deleteItem(id) {
        deletePhone(id)
    }
    return (
        <>
            {
                phones ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Brand</TableCell>
                                    <TableCell align="right">Model</TableCell>
                                    <TableCell align="right">Color</TableCell>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">#</TableCell>
                                    <TableCell align="right">#</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {phones.map((phone) => (
                                    <TableRow
                                        key={phone.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {phone.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title={phone.description}>
                                                <p>
                                                    {
                                                        phone.description.slice(0, 30)
                                                    }...
                                                </p>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="right">{phone.price}</TableCell>
                                        <TableCell align="right">{phone.brand}</TableCell>
                                        <TableCell align="right">{phone.model}</TableCell>
                                        <TableCell align="right">{phone.color}</TableCell>
                                        <TableCell align="right"><img width="30px" src={phone.image} alt="phone" /></TableCell>
                                        <TableCell align="right">
                                            <Link to={'edit/' + phone.id}>
                                                <Button color="success" variant="outlined">Edit</Button>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button color="error" variant="contained" onClick={() => {
                                                deleteItem(phone.id)
                                            }}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <h2>Loading</h2>
                )
            }

        </>
    );
}
