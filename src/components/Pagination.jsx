import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { clientContext } from '../contexts/ClientContext';

const Pagination = () => {
    const { totalPosts, postsPerPage, handlePage, currentPage } = useContext(clientContext)
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className="pagination-div">
            <ul>
                {
                    pageNumbers.map(page => (
                        <li key={page}>
                            {
                                currentPage === page ? (
                                    <Button onClick={() => {
                                        handlePage(page)
                                    }} variant="contained" color="warning" >{page}</Button>
                                ) : (
                                    <Button onClick={
                                        () => {
                                            handlePage(page)
                                        }
                                    } variant="outlined" color="warning" >{page}</Button>
                                )
                            }

                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;