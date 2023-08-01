import Rating from '@mui/material/Rating';
import React from "react";
import profilePng from "../../images/Profile.png";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
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
})

const ReviewCard = ({ review }) => {
    const classes = useStyles();
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className={classes.reviewCard}>
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;
