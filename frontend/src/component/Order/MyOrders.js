import React, { useEffect } from 'react'
import "./MyOrders.css"
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@mui/styles';
import Loader from '../layout/Loader/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { clearErrors, myOrders } from '../../actions/orderAction';
import { Link, useParams } from "react-router-dom";
import LaunchIcon from '@mui/icons-material/Launch';

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
    const classes = useStyles()
    const dispatch = useDispatch()
    const params = useParams();

    const { loading, error, orders } = useSelector((state) => state.myOrders)
    const { user } = useSelector((state) => state.user)

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            // cellClassName: (params) => {
            //     return params.getValue(params.id, "status") === "Delivered"
            //         ? "greenColor"
            //         : "redColor";
            // },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            // renderCell: () => {
            //     return (
            //         <Link to={`/order/${params.getValue(params.id, "id")}`}>
            //             <LaunchIcon />
            //         </Link>
            //     );
            // },
        },


    ]
    const rows = []

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(myOrders())
    }, [dispatch, error])


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className='myOrdersPage'>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='myOrdersTable'
                        autoHeight
                    />

                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                </div>
            )}
        </>
    )
}

export default MyOrder