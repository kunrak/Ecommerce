import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";
import Loader from "../layout/Loader/Loader.js";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    banner: {
        backgroundImage: `url("https://images.pexels.com/photos/9706134/pexels-photo-9706134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vmin',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        '& > h1': {
            margin: '5vmax',
            font: '600 2.5vmax "Roboto"',
        },
        '& > p': {
            font: '300 1.4vmax "Lucida Sans"',
        },
        '& > a > button': {
            marginBottom: '5vmax',
            cursor: 'pointer',
            backgroundColor: 'white',
            border: '1px solid white',
            borderRadius: 0,
            padding: '1vmax',
            transition: 'all 0.5s',
            width: '9vmax',
            font: '500 1vmax "Roboto"',
        },
        '& > a > button:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0)',
            color: 'white',
        },
    },
    homeHeading: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: '1.4vmax',
        borderBottom: '1px solid rgba(21, 21, 21, 0.5)',
        width: '20vmax',
        padding: '1vmax',
        margin: '5vmax auto',
        color: 'rgb(0, 0, 0, 0.7)',
    },
    container: {
        display: 'flex',
        margin: '2vmax auto',
        width: '80vw',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '100%',
    },
    '@media screen and (max-width: 600px)': {
        '& > p': {
            fontSize: '1.7vmax',
        },
        '& > div': {
            margin: '0vmax',
            display: 'block',
        },
        '& > span': {
            fontSize: '1.5vmax',
        },
        '& > div > span': {
            margin: '0 0.5vmax',
            font: '300 1vmax "Roboto"',
        },
    },
}));


const Home = () => {
    const classes = useStyles();

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className={classes.banner}>
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className={classes.homeHeading}>Featured Products</h2>

                    <Box className={classes.container} id="container">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </Box>
                </>
            )}
        </>
    );
};

export default Home;