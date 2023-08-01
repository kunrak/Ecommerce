import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getProductDetails,
    newReview,
    // newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
// import {
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Button,
// } from "@mui/material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const useStyles = makeStyles((theme) => ({
    ProductDetails: {
        padding: '6vmax',
        display: 'flex',
    },
    productDetailsDiv: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2vmax',
        '&:last-child': {
            alignItems: 'flex-start',
        },
    },
    CarouselImage: {
        width: '20vmax',
    },
    detailsBlock1: {
        '& > h2': {
            color: '#363636',
            fontWeight: 600,
            fontSize: '1.6vmax',
            fontFamily: 'Roboto',
        },
        '& > p': {
            color: 'rgba(54, 54, 54, 0.582)',
            fontWeight: 200,
            fontSize: '0.6vmax',
            fontFamily: 'cursive',
        },
    },
    detailsBlock2: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.205)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.205)',
        width: '70%',
        padding: '1vmax 0',
    },
    detailsBlock2Span: {
        fontFamily: 'cursive',
        fontWeight: 200,
        fontSize: '0.8vmax',
        color: 'rgba(0, 0, 0, 0.699)',
    },
    detailsBlock3: {
        width: '70%',
        '& > h1': {
            color: 'rgba(17, 17, 17, 0.795)',
            fontWeight: 400,
            fontSize: '1.8vmax',
            fontFamily: 'Franklin Gothic Medium',
            margin: '1vmax 0',
        },
        '& > p': {
            borderTop: '1px solid rgba(0, 0, 0, 0.205)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.205)',
            padding: '1vmax 0',
            color: 'rgba(0, 0, 0, 0.651)',
            fontWeight: 400,
            fontSize: '1vmax',
            fontFamily: 'Roboto',
            margin: '1vmax 0',
        },
        '& > .detailsBlock31': {
            display: 'flex',
            alignItems: 'center',
            '& > .detailsBlock311 > button': {
                border: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.616)',
                padding: '0.5vmax',
                cursor: 'pointer',
                color: '#fff',
                transition: 'all 0.5s',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.767)',
                },
            },
            '& > .detailsBlock311 > input': {
                border: 'none',
                padding: '0.5vmax',
                width: '1vmax',
                textAlign: 'center',
                outline: 'none',
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: '0.8vmax',
                color: 'rgba(0, 0, 0, 0.74)',
            },
            '& > .detailsBlock31 > button:last-child': {
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                transition: 'all 0.5s',
                backgroundColor: 'tomato',
                fontFamily: 'Roboto',
                fontWeight: 500,
                fontSize: '0.7vmax',
                borderRadius: '20px',
                padding: '0.5vmax 2vmax',
                margin: '1vmax',
                outline: 'none',
                '&:hover': {
                    backgroundColor: 'rgb(214, 84, 61)',
                },
            },
        },
    },
    detailsBlock31: {
        display: 'flex',
        alignItems: 'center',
    },
    detailsBlock311_button: {
        border: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.616)',
        padding: '0.5vmax',
        cursor: 'pointer',
        color: '#fff',
        transition: 'all 0.5s',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.767)',
        },
    },
    detailsBlock311_input: {
        border: 'none',
        padding: '0.5vmax',
        width: '2.5vmax',
        textAlign: 'center',
        outline: 'none',
        fontFamily: 'Roboto',
        fontWeight: 400,
        color: 'rgba(0, 0, 0, 0.74)',
    },
    detailsBlock4: {
        color: 'rgba(0, 0, 0, 0.897)',
        fontFamily: 'sans-serif',
        fontWeight: 500,
        fontSize: '1.2vmax',
        '& > p': {
            color: 'rgba(0, 0, 0, 0.534)',
            fontWeight: 300,
            fontSize: '0.8vmax',
            fontFamily: 'sans-serif',
        },
    },
    submitReview: {
        border: 'none',
        backgroundColor: 'tomato',
        fontFamily: 'Roboto',
        fontWeight: 500,
        fontSize: '0.7vmax',
        borderRadius: '20px',
        padding: '0.6vmax 2vmax',
        margin: '1vmax 0',
        color: '#fff',
        cursor: 'pointer',
        transition: 'all 0.5s',
        outline: 'none',
        '&:hover': {
            backgroundColor: 'rgb(197, 68, 45)',
            transform: 'scale(1.1)',
        },
    },
    submitDialog: {
        display: 'flex',
        flexDirection: 'column',
    },
    submitDialogTextArea: {
        border: '1px solid rgba(0, 0, 0, 0.082)',
        margin: '1vmax 0',
        outline: 'none',
        padding: '1rem',
        fontFamily: 'Roboto',
        fontWeight: 300,
        fontSize: '1rem',
    },
    reviewsHeading: {
        color: '#000000be',
        fontFamily: 'Roboto',
        fontWeight: 500,
        fontSize: '1.4vmax',
        textAlign: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.226)',
        padding: '1vmax',
        width: '20vmax',
        margin: 'auto',
        marginBottom: '4vmax',
    },
    reviews: {
        display: 'flex',
        overflow: 'auto',
    },
    reviewCard: {
        flex: 'none',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.226)',
        border: '1px solid rgba(56, 56, 56, 0.116)',
        width: '30vmax',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1vmax',
        padding: '3vmax',
        '& > img': {
            width: '5vmax',
        },
        '& > p': {
            color: 'rgba(0, 0, 0, 0.836)',
            fontFamily: 'Roboto',
            fontWeight: 600,
            fontSize: '0.9vmax',
        },
        '& > .reviewCardComment': {
            color: 'rgba(0, 0, 0, 0.445)',
            fontFamily: 'cursive',
            fontWeight: 300,
            fontSize: '0.8vmax',
        },
    },
    noReviews: {
        fontFamily: 'Gill Sans',
        fontWeight: 400,
        fontSize: '1.3vmax',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.548)',
    },
    '@media screen and (max-width: 600px)': {
        ProductDetails: {
            flexDirection: 'column',
            height: 'unset',
            '& > div:last-child': {
                alignItems: 'center',
            },
        },
        '.detailsBlock1 > h2': {
            fontSize: '2.8vmax',
            textAlign: 'center',
        },
        '.detailsBlock1 > p': {
            textAlign: 'center',
            fontSize: '1vmax',
        },
        '.detailsBlock2': {
            justifyContent: 'center',
            '& > span': {
                fontSize: '1.5vmax',
            },
        },
        '.detailsBlock3 > h1': {
            fontFamily: 'Franklin Gothic Medium',
            fontWeight: 700,
            fontSize: '3vmax',
            textAlign: 'center',
            margin: '1vmax 0',
        },
        '.detailsBlock31': {
            flexDirection: 'column',
        },
        '.detailsBlock311': {
            padding: '2vmax 0',
            '& > button': {
                padding: '1.2vmax',
                width: '4vmax',
                border: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.616)',
                cursor: 'pointer',
                color: '#fff',
                transition: 'all 0.5s',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.767)',
                },
            },
            '& > input': {
                padding: '1.5vmax',
                width: '3vmax',
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: '1.8vmax',
                textAlign: 'center',
                border: 'none',
                outline: 'none',
                color: 'rgba(0, 0, 0, 0.74)',
            },
            '& > button:last-child': {
                fontFamily: 'Roboto',
                fontWeight: 500,
                fontSize: '1.7vmax',
                padding: '1.5vmax',
                width: '20vmax',
                margin: '3vmax 0',
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                transition: 'all 0.5s',
                backgroundColor: 'tomato',
                borderRadius: '20px',
                outline: 'none',
                '&:hover': {
                    backgroundColor: 'rgb(214, 84, 61)',
                },
            },
        },
        '.detailsBlock3 > p': {
            padding: '2.5vmax 0',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '2vmax',
            color: 'rgba(0, 0, 0, 0.651)',
            margin: '1vmax 0',
            borderTop: '1px solid rgba(0, 0, 0, 0.205)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.205)',
        },
        '.detailsBlock4': {
            fontFamily: 'sans-serif',
            fontWeight: 500,
            fontSize: '2.5vmax',
            color: 'rgba(0, 0, 0, 0.897)',
            '& > p': {
                fontFamily: 'sans-serif',
                fontWeight: 300,
                fontSize: '1.8vmax',
                color: 'rgba(0, 0, 0, 0.534)',
            },
        },
        '.submitReview': {
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: '1.7vmax',
            padding: '1.5vmax',
            width: '20vmax',
            margin: '3vmax 0',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.5s',
            backgroundColor: 'tomato',
            borderRadius: '20px',
            outline: 'none',
            color: '#fff',
            '&:hover': {
                backgroundColor: 'rgb(197, 68, 45)',
                transform: 'scale(1.1)',
            },
        },
        '.reviewCard > p': {
            fontFamily: 'Roboto',
            fontWeight: 600,
            fontSize: '3vw',
        },
        '.reviewCardComment': {
            fontFamily: 'cursive',
            fontWeight: 300,
            fontSize: '5vw',
            color: 'rgba(0, 0, 0, 0.445)',
        },
    },
}));

const ProductDetails = () => {
    const classes = useStyles();
    const { id } = useParams();
    console.log(id)
    const dispatch = useDispatch();
    const alert = useAlert();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    const options = {
        size: "large",
        value: 4,
        readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating)
        myForm.set("comment", comment)
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully")
            dispatch({ type: NEW_REVIEW_RESET })
        }

        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Box className={classes.ProductDetails}>
                        <Box className={classes.productDetailsDiv}>
                            {product.images &&
                                product.images.map((item, i) => (
                                    <img
                                        className={classes.CarouselImage}
                                        key={item.url}
                                        src={item.url}
                                        alt={`${i} Slide`}
                                    />
                                ))}
                        </Box>

                        <Box className={classes.productDetailsDiv}>
                            <Box className={classes.detailsBlock1}>
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </Box>
                            <Box className={classes.detailsBlock2}>
                                <Rating {...options} />
                                <span className={classes.detailsBlock2Span}>
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </Box>
                            <Box className={classes.detailsBlock3}>
                                <h1>{`₹${product.price}`}</h1>
                                <Box className={classes.detailsBlock31}>
                                    <Box className={classes.detailsBlock311} mr={2}>
                                        <button className={classes.detailsBlock311_button} onClick={decreaseQuantity}>-</button>
                                        <input className={classes.detailsBlock311_input} readOnly type="number" value={quantity} />
                                        <button className={classes.detailsBlock311_button} onClick={increaseQuantity}>+</button>
                                    </Box>
                                    <Button
                                        disabled={product.Stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                        variant="contained"
                                    >
                                        Add to Cart
                                    </Button>
                                </Box>

                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </Box>

                            <Box className="detailsBlock4">
                                Description : <p>{product.description}</p>
                            </Box>

                            <button onClick={submitReviewToggle} className={classes.submitReview}>
                                Submit Review
                            </button>
                        </Box>
                    </Box>

                    <h3 className={classes.reviewsHeading}>REVIEWS</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className={classes.submitDialog}>
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className={classes.submitDialogTextArea}
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                            <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews && product.reviews[0] ? (
                        <Box className={classes.reviews}>
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                        </Box>
                    ) : (
                        <p className={classes.noReviews}>No Reviews Yet</p>
                    )}
                </>
            )}
        </>
    );
};

export default ProductDetails;