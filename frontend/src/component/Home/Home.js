import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";
import Loader from "../layout/Loader/Loader.js";
import { makeStyles } from "@mui/styles";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

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
    },
    homeHeading: {
        textAlign: 'center',
        borderBottom: '1px solid rgba(21, 21, 21, 0.5)',
        padding: '1vmax',
    },
    scrollButton: {
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
    container: {
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '2vmax auto',
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
    const { t } = useTranslation(["home"]);
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
                    <Box className={classes.banner}>
                        <Typography>{t("welcomeMsg")}</Typography>
                        <Typography variant="h4" m={6}>{t("headingTitle")}</Typography>

                        <Link href="#container">
                            <Button className={classes.scrollButton} sx={{ color: "white", backgroundColor: "blue" }}>
                                {t("buttonText")} <CgMouse />
                            </Button>
                        </Link>
                    </Box>

                    <Container>
                        <Typography className={classes.homeHeading}>{t('featured')}</Typography>
                        <Box className={classes.container} id="container">
                            {products &&
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                        </Box>
                    </Container>
                </>
            )}
        </>
    );
};

export default Home;
