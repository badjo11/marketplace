import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import BasicTable from '../components/BasicTable';
import { adminContext } from '../contexts/AdminContext';
const AdminPage = () => {
    const { clearState } = useContext(adminContext)
    useEffect(() => {
        clearState()
    }, [])
    return (
        <div>
            <h2>Admin Page</h2>
            <div>
                <Link to="/admin/add">
                    <Button variant='outlined' color="info">Добавить телефон</Button>
                </Link>
            </div>
            <BasicTable />
        </div>
    );
};

export default AdminPage;