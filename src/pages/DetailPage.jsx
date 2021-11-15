import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { clientContext } from '../contexts/ClientContext';

const DetailPage = () => {
    const { getPhoneById, phone } = useContext(clientContext)
    const params = useParams()
    useEffect(() => {
        getPhoneById(params.id)
    }, [])
    return (
        <div>
            {
                phone ? (
                    <div style={{ display: 'flex' }}>
                        <div>
                            <img width='500px' src={phone.image} alt="phone" />
                        </div>
                        <div>
                            <h2>{phone.name}</h2>
                            <h3>{phone.description}</h3>
                            <p>{phone.price} сом</p>
                            <p>{phone.brand} {phone.model}</p>
                            Color: <div style={{ marginBottom: '-10px', width: '30px', borderRadius: '50%', height: '30px', backgroundColor: phone.color, display: 'inline-block' }}></div>
                            <br />
                            <br />
                            <Button variant='contained' color="warning">
                                <ShoppingCart />
                                Add to Cart
                            </Button>
                        </div>

                    </div>
                ) : (
                    <h2>Loading</h2>
                )
            }
        </div >
    );
};

export default DetailPage;