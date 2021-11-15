import React, { useContext, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { clientContext } from '../contexts/ClientContext';
const CartPage = () => {
    const { changeCountPhone, getAll, cart } = useContext(clientContext)
    useEffect(() => {
        getAll()
    }, [])
    return (
        <div>
            <h2>Корзина</h2>
            {
                cart ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">Count</TableCell>
                                    <TableCell align="right">Summa</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.phones.map((item) => (
                                    <TableRow
                                        key={item.phone.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.phone.name}
                                        </TableCell>
                                        <TableCell align="right"><img width="50px" src={item.phone.image} alt="phone" /></TableCell>
                                        <TableCell align="right">
                                            <input type="number" onChange={(e) => changeCountPhone(e.target.value, item.phone.id)} value={item.count} />
                                        </TableCell>
                                        <TableCell align="right">{item.subPrice}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow >
                                    <TableCell colSpan={3} align="right" style={{ fontWeight: 'bold', fontSize: '18px' }}>Total: </TableCell>
                                    <TableCell align="right" style={{ fontWeight: 'bold', fontSize: '18px' }}>{cart.totalPrice} сом</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <h2>Loading...</h2>
                )
            }

            <h3>Total price: {cart.totalPrice} сом</h3>
        </div>
    );
};

export default CartPage;