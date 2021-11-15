import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'
import { clientContext } from '../contexts/ClientContext';
export default function MediaCard({ phone }) {
    const { addAndDeletePhoneInCart, checkPhoneInCart } = React.useContext(clientContext)
    // console.log(props)
    return (
        <Card sx={{ width: 200, margin: '1%' }}>
            <CardMedia
                component="img"
                height="300"
                style={{ objectFit: 'contain' }}
                image={phone.image}
                alt="phone"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {phone.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {phone.description}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" color={checkPhoneInCart(phone.id) ? 'error' : 'success'} onClick={() => addAndDeletePhoneInCart(phone)}>
                    <ShoppingCartIcon />
                </Button>
                <Link to={`/phones/${phone.id}`}>
                    <Button size="small">Learn More</Button>
                </Link>
            </CardActions>

        </Card>
    );
}
