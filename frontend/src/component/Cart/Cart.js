import React from 'react'
import CartItemCard from './CartItemCard'
import { makeStyles } from '@mui/styles';
import { Box, Button, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { RemoveShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    emptyCart: {
        margin: 'auto',
        textAlign: 'center',
        padding: '10vmax',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartSvg: {
        fontSize: '5vmax',
        color: 'tomato',
    },
    emptyCartText: {
        fontSize: '2vmax',
    },
    emptyCartButton: {
        backgroundColor: 'rgb(51, 51, 51)',
        color: 'white',
        border: 'none',
        padding: '1vmax 3vmax',
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: '1vmax',
        textDecoration: 'none',
    },
    cartPage: {
        padding: '5vmax',
    },
    cartHeader: {
        backgroundColor: 'tomato',
        width: '90%',
        boxSizing: 'border-box',
        margin: 'auto',
        color: 'white',
        display: 'grid',
        gridTemplateColumns: '4fr 1fr 1fr',
        fontFamily: 'Roboto',
        fontWeight: 300,
        fontSize: '0.7vmax',
    },
    cartHeaderText: {
        margin: '10px',
    },
    cartHeaderTextEnd: {
        textAlign: 'end',
        marginRight: '10px',
    },
    cartContainer: {
        width: '90%',
        margin: 'auto',
        display: 'grid',
        gridTemplateColumns: '4fr 1fr 1fr',
    },
    cartInput: {
        display: 'flex',
        alignItems: 'center',
        height: '8vmax',
    },
    cartInputButtonHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.767)',
    },
    cartInputInput: {
        border: 'none',
        padding: '0.5vmax',
        width: '1.5vmax',
        textAlign: 'center',
        outline: 'none',
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: '0.8vmax',
        color: 'rgba(0, 0, 0, 0.74)',
    },
    cartSubtotal: {
        display: 'flex',
        padding: '0.5vmax',
        height: '8vmax',
        alignItems: 'center',
        boxSizing: 'border-box',
        fontFamily: 'cursive',
        fontWeight: 300,
        fontSize: '1vmax',
        justifyContent: 'flex-end',
        color: 'rgba(0, 0, 0, 0.753)',
    },
    cartGrossProfit: {
        display: 'grid',
        gridTemplateColumns: '2fr 1.2fr',
    },
    cartGrossProfitBox: {
        borderTop: '3px solid tomato',
        margin: '1vmax 4vmax',
        boxSizing: 'border-box',
        padding: '2vmax 0',
        fontFamily: 'Roboto',
        fontWeight: 300,
        fontSize: '1vmax',
        display: 'flex',
        justifyContent: 'space-between',
    },
    checkOutBtn: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    checkOutBtnButton: {
        backgroundColor: 'tomato',
        color: 'white',
        border: 'none',
        padding: '0.8vmax 4vmax',
        width: '50%',
        fontFamily: 'Roboto',
        fontWeight: 300,
        fontSize: '0.8vmax',
        margin: '1vmax 4vmax',
        cursor: 'pointer',
        borderRadius: '30px',
    },
    '@media screen and (max-width: 600px)': {
        cartPage: {
            padding: '0',
            minHeight: '60vh',
        },
        cartHeader: {
            width: '100%',
            fontFamily: 'Roboto',
            fontWeight: 300,
            fontSize: '1.7vmax',
            gridTemplateColumns: '3fr 1fr 1fr',
        },
        cartContainer: {
            width: '100%',
            gridTemplateColumns: '3fr 1fr 1fr',
        },
        cartInput: {
            height: '20vmax',
        },
        cartInputButton: {
            padding: '1.5vmax',
        },
        cartInputInput: {
            width: '2vmax',
            padding: '1.5vmax',
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '1.8vmax',
        },
        cartSubtotal: {
            padding: '1.5vmax',
            height: '20vmax',
            fontFamily: 'Roboto',
            fontWeight: 300,
            fontSize: '2vmax',
        },
        cartGrossProfit: {
            display: 'grid',
            gridTemplateColumns: '0fr 2fr',
        },
        cartGrossProfitBox: {
            padding: '2vmax',
            fontFamily: 'Roboto',
            fontWeight: 300,
            fontSize: '2vmax',
        },
        checkOutBtnButton: {
            padding: '2vmax 4vmax',
            width: '100%',
            fontFamily: 'Roboto',
            fontWeight: 300,
            fontSize: '2vmax',
        },
    },
}));


function Cart() {
    const { t } = useTranslation(["cart"]);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }

        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }

        dispatch(addItemsToCart(id, newQty));
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    const checkoutHandler = () => {
        navigate("/shipping");
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <Box className={classes.emptyCart}>
                    <RemoveShoppingCart className={classes.emptyCartSvg} />

                    <Typography className={classes.emptyCartText}>No product in the cart</Typography>
                    <Link className={classes.emptyCartButton} to='/products'>View Products</Link>
                </Box>
            ) : (
                <Box className={classes.cartPage}>
                    <Box className={classes.cartHeader} p={0.5}>
                        <Typography pl={2} className={classes.cartHeaderText}>{t('product')}</Typography>
                        <Typography className={classes.cartHeaderText}>{t('quantity')}</Typography>
                        <Typography pr={0.5} className={classes.cartHeaderTextEnd}>{t('subTotal')}</Typography>
                    </Box>

                    {cartItems && cartItems.map((item) => (
                        <Box className={classes.cartContainer} key={item.product}>
                            <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                            <Box className={classes.cartInput}>
                                <Button onClick={() => decreaseQuantity(item.product, item.quantity, item.stock)} variant='contained' sx={{ height: 25, minWidth: 10 }}>-</Button>
                                <input className={classes.cartInputInput} type='number' value={item.quantity} readOnly />
                                <Button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} variant='contained' sx={{ height: 25, minWidth: 10 }}>+</Button>
                            </Box>
                            <Typography className={classes.cartSubtotal}>{`$${item.price * item.quantity}`}</Typography>
                        </Box>
                    ))}

                    <Box className={classes.cartGrossProfit}>
                        <Box></Box>
                        <Box className={classes.cartGrossProfitBox}>
                            <Typography>Gross Total</Typography>
                            <Typography>{`$${cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price,
                                0
                            )}`}</Typography>
                        </Box>
                        <Box></Box>
                        <Container>
                            <Box className={classes.checkOutBtn} mr={5}>
                                <Button variant='contained' className={classes.checkOutBtnButton} onClick={checkoutHandler}>Check Out</Button>
                            </Box>
                        </Container>
                    </Box>
                </Box>
            )
            }
        </>
    )
}

export default Cart