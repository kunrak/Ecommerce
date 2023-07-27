import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    orderSuccess: {
        margin: 'auto',
        textAlign: 'center',
        padding: '10vmax',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderSuccessSvg: {
        fontSize: '7vmax',
        color: 'tomato',
    },
    orderSuccessText: {
        fontSize: '2vmax',
    },
    orderSuccessLink: {
        backgroundColor: 'rgb(51, 51, 51)',
        color: 'white',
        border: 'none',
        padding: '1vmax 3vmax',
        cursor: 'pointer',
        font: '400 1vmax "Roboto"',
        textDecoration: 'none',
        margin: '2vmax',
    },
    '@media screen and (max-width: 600px)': {
        orderSuccessLink: {
            padding: '3vw 6vw',
            font: '400 4vw "Roboto"',
            margin: '2vmax',
        },
        orderSuccessSvg: {
            fontSize: '20vw',
        },
        orderSuccessText: {
            margin: '2vmax',
            fontSize: '5vw',
        },
    },
}));

function OrderSuccess() {
    const classes = useStyles();
    return (
        <div className={classes.orderSuccess}>
            <CheckCircle className={classes.orderSuccessSvg} />

            <Typography className={classes.orderSuccessText}>Your Order has been Placed successfully </Typography>
            <Link className={classes.orderSuccessLink} to="/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;