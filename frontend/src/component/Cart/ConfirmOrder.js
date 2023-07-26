import React from 'react'
import { useSelector } from 'react-redux'

function ConfirmOrder() {
    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    return (
        <>

        </>
    )
}

export default ConfirmOrder