import React from "react";
import { Link } from "react-router-dom";
import { Box, Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
        '& > img': {
            width: '13vmax',
            height: '16vmax',
            objectFit: 'contain',
        },
        '& > div': {
            margin: '0.5vmax',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
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
    const classes = useStyles();

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <Link className={classes.productCard} to={`product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <Rating {...options} />
            <span className={classes.productCardSpan}>
                ({product.numOfReviews} Reviews)
            </span>
            {/* <div>
                <Rating {...options} />{" "}
                <Box className={classes.productCardSpan}>
                    ({product.numOfReviews} Reviews)
                </Box>
            </div> */}
            <Box>{`₹${product.price}`}</Box>
        </Link >
    );
};

export default ProductCard;
