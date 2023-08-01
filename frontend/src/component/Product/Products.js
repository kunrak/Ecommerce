import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { Box, Slider, Typography } from '@mui/material';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    productsHeading: {
        margin: "2vmax auto",
        width: "15vw",
        borderBottom: "1px solid rgba(0, 0, 0, 0.171)",
        padding: "2vmax",
        color: "rgba(0, 0, 0, 0.678)",
        fontFamily: "Roboto",
        fontWeight: 500,
        fontSize: "1.5vmax",
        textAlign: "center",
    },
    products: {
        display: "flex",
        flexWrap: "wrap",
        padding: "0 5vmax",
        justifyContent: "center",
        minHeight: "30vh",
    },
    paginationBox: {
        display: "flex",
        justifyContent: "center",
        margin: "6vmax",
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        padding: 0,
    },
    pageItem: {
        backgroundColor: "rgb(255, 255, 255)",
        listStyle: "none",
        border: "1px solid rgba(0, 0, 0, 0.178)",
        padding: "1vmax 1.5vmax",
        transition: "all 0.3s",
        cursor: "pointer",
        "&:first-child": {
            borderRadius: "5px 0 0 5px",
        },
        "&:last-child": {
            borderRadius: "0 5px 5px 0",
        },
        "&:hover": {
            backgroundColor: "rgb(230, 230, 230)",
            "& .page-link": {
                color: "rgb(0, 0, 0)",
            },
        },
    },
    pageLink: {
        textDecoration: "none",
        fontFamily: "Roboto",
        fontWeight: 300,
        fontSize: "0.7vmax",
        color: "rgb(80, 80, 80)",
        transition: "all 0.3s",
    },
    pageItemActive: {
        backgroundColor: "tomato",
    },
    pageLinkActive: {
        color: "white",
    },
    filterBox: {
        width: "10vmax",
        position: "absolute",
        top: "10vmax",
        left: "4vmax",
        "& > fieldset": {
            border: "1px solid rgba(0, 0, 0, 0.329)",
        },
    },
    categoryBox: {
        padding: "0%",
    },
    categoryLink: {
        listStyle: "none",
        color: "rgba(0, 0, 0, 0.61)",
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: "0.8vmax",
        margin: "0.4vmax",
        cursor: "pointer",
        transition: "all 0.5s",
        "&:hover": {
            color: "tomato",
        },
    },
    "@media screen and (max-width: 600px)": {
        filterBox: {
            width: "20vmax",
            position: "static",
            margin: "auto",
        },
        pageLink: {
            fontFamily: "Roboto",
            fontWeight: 300,
            fontSize: "1.7vmax",
        },
        categoryLink: {
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: "1.8vmax",
        },
    },
}));

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = () => {
    const { t } = useTranslation(["product"]);

    const keyword = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 150000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const {
        products,
        loading,
        error,
        // productsCount,
        // resultPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);

    // const setCurrentPageNo = (e) => {
    //     setCurrentPage(e);
    // };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    // let count = filteredProductsCount;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, alert, error, currentPage, price, category, ratings]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h2 className={classes.productsHeading}>{t('product')}</h2>

                    <Box className={classes.products}>
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </Box>

                    <Box className={classes.filterBox}>
                        <Typography>{t('price')}</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={150000}
                        />

                        <Typography>{t('categories')}</Typography>
                        <ul className={classes.categoryBox}>
                            {categories.map((category) => (
                                <li
                                    className={classes.categoryLink}
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </Box>
                </>
            )}
        </>
    );
};

export default Products;
