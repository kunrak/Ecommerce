import React from 'react'
import { Link } from 'react-router-dom'
import "./CartItemCard.css"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    CartItemCard: {
        display: 'flex',
        padding: '1vmax',
        height: '8vmax',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        // [theme.breakpoints.down('sm')]: {
        //     padding: '3vmax',
        //     height: '25vmax',
        // },
    },
    img: {
        width: '5vmax',
        // [theme.breakpoints.down('sm')]: {
        //     width: '10vmax',
        // },
    },
    div: {
        display: 'flex',
        margin: '0.3vmax 1vmax',
        flexDirection: 'column',
        // [theme.breakpoints.down('sm')]: {
        //     margin: '1vmax 2vmax',
        // },
    },
    a: {
        fontFamily: 'cursive',
        fontWeight: 300,
        fontSize: '0.9vmax',
        color: 'rgba(24, 24, 24, 0.815)',
        textDecoration: 'none',
        // [theme.breakpoints.down('sm')]: {
        //     fontSize: '2vmax',
        // },
    },
    span: {
        fontFamily: 'Roboto',
        fontWeight: 300,
        fontSize: '0.9vmax',
        color: 'rgba(24, 24, 24, 0.815)',
        // [theme.breakpoints.down('sm')]: {
        //     fontSize: '1.9vmax',
        // },
    },
    p: {
        color: 'tomato',
        fontFamily: 'Roboto',
        fontWeight: 100,
        fontSize: '0.8vmax',
        cursor: 'pointer',
        // [theme.breakpoints.down('sm')]: {
        //     fontSize: '1.8vmax',
        // },
    },
}));

function CartItemCard({ item, deleteCartItems }) {
    const classes = useStyles();
    return (
        <div className={classes.CartItemCard}>
            <img className={classes.img} src={item.image} alt="ssa" />
            <div className={classes.div}>
                <Link className={classes.a} to={`/product/${item.product}`}>{item.name}</Link>
                <span className={classes.span}>{`Price: $${item.price}`}</span>
                <p className={classes.p} onClick={() => deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>
    )
}

export default CartItemCard