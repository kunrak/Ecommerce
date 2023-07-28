import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    myOrdersPage: {
        width: '100vw',
        maxWidth: '100%',
        padding: '0 7vmax',
        boxSizing: 'border-box',
        backgroundColor: 'rgb(235, 235, 235)',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    myOrdersHeading: {
        textAlign: 'center',
        font: '400 1.2vmax "Roboto"',
        padding: '0.5vmax',
        boxSizing: 'border-box',
        color: 'rgb(255, 255, 255)',
        transition: 'all 0.5s',
        backgroundColor: 'rgb(44, 44, 44)',
    },
    myOrdersTable: {
        backgroundColor: 'white',
    },
    myOrdersTableDiv: {
        font: '300 1vmax "Roboto"',
        color: 'rgba(0, 0, 0, 0.678)',
        border: 'none',
    },
    myOrdersTableLink: {
        color: 'rgba(0, 0, 0, 0.527)',
        transition: 'all 0.5s',
        '&:hover': {
            color: 'tomato',
        },
    },
    MuiDataGridColumnHeader: {
        backgroundColor: 'tomato',
        padding: '1vmax !important',
        '& div': {
            color: 'rgb(255, 255, 255)',
            font: '500 1.1vmax "Roboto" !important',
        },
    },
    MuiDataGridIconSeparator: {
        display: 'none !important',
    },
}));

function MyOrder() {
    const { loading } = useSelector((state) => state.order)

    return (
        <div>MyOrder</div>
    )
}

export default MyOrder