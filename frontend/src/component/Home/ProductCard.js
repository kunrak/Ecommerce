import React from "react";
import { Link } from "react-router-dom";
import { Box, Rating, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

//Creating the styles for the Product Card
const useStyles = makeStyles({
    productCard: {
        width: '14vmax',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'rgb(48, 48, 48)',
        margin: '2vmax',
        transition: 'all 0.5s',
        paddingBottom: '0.5vmax',
        '& > p': {
            fontFamily: 'Roboto',
            fontSize: '1.2vmax',
            margin: '1vmax 0.5vmax',
            marginBottom: 0,
        },
        '& > span': {
            margin: '0.5vmax',
            color: 'tomato',
            fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
            fontSize: '1vmax',
        },

    },
    productImg: {
        width: '13vmax',
        height: '16vmax',
        objectFit: 'contain',
    },
    productBox: {
        margin: '0.5vmax',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    productCardSpan: {
        margin: '0.5vmax',
        font: '300 0.7vmax "Roboto"',
    },
    productDiv: {
        margin: '0.5vmax',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

const ProductCard = ({ product }) => {
    const { t } = useTranslation(["product"]);
    const classes = useStyles();

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        // Creating the product card
        <Link className={classes.productCard} to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <Typography>{product.name}</Typography>
            <Rating {...options} />
            <span className={classes.productCardSpan}>
                ({product.numOfReviews} {t('reviews')})
            </span>
            <div>
                <Rating {...options} />{" "}
                <Box className={classes.productCardSpan}>
                    ({product.numOfReviews} Reviews)
                </Box>
            </div>
            <Box>{`₹${product.price}`}</Box>
        </Link >
    );
};

export default ProductCard;
