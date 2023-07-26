import { Dashboard, ExitToApp, Inventory, ListAlt, Person, ShoppingCart } from '@mui/icons-material'
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../actions/userAction'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles({
    speedDial: {
        position: 'fixed',
        right: '3vmax',
        top: '5vmax',
    },
    speedDialIcon: {
        width: 70,
        height: 70,
        borderRadius: '50%',
    },
})

function UserOptions({ user }) {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <Dashboard />, name: "Dashboard", func: dashboard },
        { icon: <Inventory />, name: "Products", func: products },
        { icon: <ShoppingCart />, name: "Cart", func: cart },
        { icon: <ListAlt />, name: "Orders", func: orders },
        { icon: <Person />, name: "Profile", func: account },
        { icon: <ExitToApp />, name: "Logout", func: logoutUser },
    ]

    function dashboard() {
        navigate("/")
    }

    function cart() {
        navigate("/cart")
    }

    function orders() {
        navigate("/orders")
    }

    function account() {
        navigate("/account")
    }

    function products() {
        navigate("/products")
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logged out successfully")
    }

    return (
        <>
            <Backdrop open={open} />
            <SpeedDial
                className={classes.speedDial}
                ariaLabel="SpeedDial Tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                icon={<img
                    className='speedDialIcon'
                    src={"/Profile.png"}
                    height={70}
                    alt="profile"
                />}
            >
                {options.map((item) => (
                    <SpeedDialAction
                        className={classes.speedDialIcon}
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

export default UserOptions