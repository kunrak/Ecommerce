import React, { useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { Box, Typography } from '@mui/material'
import { CreditCard, Event, VpnKey } from '@mui/icons-material'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    paymentContainer: {
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'rgb(255, 255, 255)',
        height: '65vh',
        margin: '2vmax',
    },
    paymentForm: {
        width: '22%',
        height: '100%',
    },
    paymentFormTitle: {
        font: '400 2vmax "Roboto"',
        color: 'rgba(0, 0, 0, 0.753)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.13)',
        padding: '1vmax 0',
        textAlign: 'center',
        width: '100%',
        margin: 'auto',

    },
    paymentFormContent: {
        display: 'flex',
        alignItems: 'center',
        margin: '2vmax 0',
    },
    paymentInput: {
        padding: '1vmax 4vmax',
        paddingRight: '1vmax',
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid rgba(0, 0, 0, 0.267)',
        borderRadius: '4px',
        outline: 'none',
    },
    paymentIcon: {
        position: 'absolute',
        transform: 'translateX(1vmax)',
        fontSize: '1.6vmax',
        color: 'rgba(0, 0, 0, 0.623)',
    },
    paymentFormBtn: {
        border: 'none',
        backgroundColor: 'tomato',
        color: 'white',
        font: '300 0.9vmax "Roboto"',
        width: '100%',
        padding: '0.8vmax',
        cursor: 'pointer',
        transition: 'all 0.5s',
        outline: 'none',
        '&:hover': {
            backgroundColor: 'rgb(179, 66, 46)',
        },
    },
    '@media screen and (max-width: 600px)': {
        paymentForm: {
            width: '90%',
        },
        paymentFormTitle: {
            font: '400 8vw "Roboto"',
            padding: '4vw 0',
            width: '60%',
        },
        paymentFormContent: {
            margin: '10vw 0',
        },
        paymentInput: {
            padding: '4vw 10vw',
        },
        paymentIcon: {
            fontSize: '6vw',
        },
        paymentFormBtn: {
            font: '300 4vw "Roboto"',
            padding: '4vw',
        },
    },
}));

function Payment() {
    const classes = useStyles();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    // const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            )

            const client_secret = data.client_secret

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    },
                },
            })

            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    navigate("/success");
                } else {
                    alert.error("There's some issue while processing payment");
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    }
    return (
        <>
            <title>Payment</title>
            <CheckoutSteps activeStep={2} />
            <Box className={classes.paymentContainer}>
                <form className={classes.paymentForm} onSubmit={(e) => submitHandler(e)}>
                    <Typography className={classes.paymentFormTitle}>Card Info</Typography>
                    <Box className={classes.paymentFormContent}>
                        <CreditCard className={classes.paymentIcon} />
                        <CardNumberElement className={classes.paymentInput} />
                    </Box>
                    <Box className={classes.paymentFormContent}>
                        <Event className={classes.paymentIcon} />
                        <CardExpiryElement className={classes.paymentInput} />
                    </Box>
                    <Box className={classes.paymentFormContent}>
                        <VpnKey className={classes.paymentIcon} />
                        <CardCvcElement className={classes.paymentInput} />
                    </Box>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className={classes.paymentFormBtn}
                    />
                </form>
            </Box>
        </>
    )
}

export default Payment