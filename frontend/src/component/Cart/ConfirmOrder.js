import "./ConfirmOrder.css"
import { useSelector } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import { Box, Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    confirmOrderPage: {
        height: '100vh',
        backgroundColor: 'white',
        display: 'grid',
        gridTemplateColumns: '6fr 3fr',
        [theme.breakpoints.down('md')]: {
            display: "flex",
            flexDirection: "column",
            textAlign: "center"
        },
    },
    confirmshippingArea: {
        padding: '5vmax',
        paddingBottom: '0%',
        '& > p': {
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '1.8vmax',
        },
    },
    confirmshippingAreaBox: {
        margin: '2vmax',
        '& > div': {
            display: 'flex',
            alignItems: 'center',
            margin: '1vmax 0',
            '& > p': {
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: '1vmax',
                color: 'black',
            },
            '& > span': {
                margin: '0 1vmax',
                fontFamily: 'Roboto',
                fontWeight: 100,
                fontSize: '1vmax',
                color: '#575757',
            },
        },
    },
    confirmCartItems: {
        padding: '5vmax',
        paddingTop: '2vmax',
        '& > p': {
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '1.8vmax',
        },
    },
    confirmCartItemsContainer: {
        maxHeight: '20vmax',
        overflowY: 'auto',
        '& > div': {
            display: 'flex',
            fontFamily: 'Roboto',
            fontWeight: 400,
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '2vmax 0',
            '& > img': {
                width: '5vmax',
            },
            '& > a': {
                color: '#575757',
                margin: '0 2vmax',
                width: '60%',
                textDecoration: 'none',
            },
            '& > span': {
                fontFamily: 'Roboto',
                fontWeight: 100,
                fontSize: '1vmax',
                color: '#5e5e5e',
            },
        },
    },
    orderSummary: {
        padding: '7vmax',
        '& > p': {
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '1.8vmax',
            borderBottom: '1px solid rgba(0, 0, 0, 0.267)',
            padding: '1vmax',
            width: '100%',
            margin: 'auto',
            boxSizing: 'border-box',
        },
        '& > div > div': {
            display: 'flex',
            fontFamily: 'Roboto',
            fontWeight: 300,
            justifyContent: 'space-between',
            margin: '2vmax 0',
            '& > span': {
                color: 'rgba(0, 0, 0, 0.692)',
            },
        },
        '& > .orderSummaryTotal': {
            display: 'flex',
            fontFamily: 'Roboto',
            fontWeight: 300,
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(0, 0, 0, 0.363)',
            padding: '2vmax 0',
        },
        '& > button': {
            width: '100%',
            padding: '1vmax',
            border: 'none',
            margin: 'auto',
            cursor: 'pointer',
            transition: '0.5s',
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '1vmax',
            '&:hover': {
                backgroundColor: 'rgb(192, 71, 50)',
            },
        },
    },
    confirmOrderPageLastChild: {
        borderLeft: '1px solid rgba(0, 0, 0, 0.247)',
    },
}));

function ConfirmOrder() {
    const classes = useStyles()

    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )

    const shippingCharges = subtotal > 100 ? 0 : 50;

    const tax = subtotal * 0.18

    const totalPrice = subtotal + shippingCharges + tax;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate("/process/payment")
    }

    return (
        <>
            <CheckoutSteps activeStep={1} />
            <Box className={classes.confirmOrderPage}>
                <Box>
                    <Box className={classes.confirmshippingArea}>
                        <Typography>Shipping Info</Typography>
                        <Box className={classes.confirmshippingAreaBox}>
                            <Box>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </Box>
                            <Box>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </Box>
                            <Box>
                                <p>Address:</p>
                                <span>{address}</span>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.confirmCartItems}>
                        <Typography>Your Cart Items:</Typography>
                        <Box className={classes.confirmCartItemsContainer}>
                            {cartItems &&
                                cartItems.map((item) => (
                                    <Box key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X ₹{item.price} ={" "}
                                            <b>₹{item.price * item.quantity}</b>
                                        </span>
                                    </Box>
                                ))}
                        </Box>
                    </Box>
                </Box>

                <Box>
                    <Box className={classes.orderSummary}>
                        <Typography>Order Summery</Typography>
                        <Box>
                            <Box>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </Box>
                            <Box>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </Box>
                            <Box>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </Box>
                        </Box>

                        <Box className={classes.orderSummaryTotal}>
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </Box>
                        <hr />
                        <Button onClick={proceedToPayment}>Proceed To Payment</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ConfirmOrder