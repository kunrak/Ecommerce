import React from 'react'
import { Stack, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";

const useStyles = makeStyles({
    footer: {
        spacing: 2,
        backgroundColor: "rgb(34, 33, 33)",
        marginTop: 120,
    },
    leftFooter: {
        width: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24
    },
    midFooter: {
        width: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24
    },
    rightFooter: {
        width: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24
    },
    midPara: {
        maxWidth: "60%",
        margin: 2,
    }
})

function Footer() {
    const classes = useStyles();

    return (
        <Stack direction="row" className={classes.footer} >
            <Box className={classes.leftFooter} textAlign="center">
                <h4 style={{ color: "white" }}>DOWNLOAD OUR APP</h4>
                <h5 style={{ color: "white" }}>Download App for Android and IOS mobile phone</h5>
                <Stack>
                    <Box>
                        <img src={playStore} alt="playstore" height="50" />
                    </Box>
                    <Box>
                        <img src={appStore} alt="appstore" height="50" />
                    </Box>
                </Stack>
            </Box >
            <Box className={classes.midFooter}>
                <Typography variant='h2' color="#eb4034">
                    ECOMMERCE.
                </Typography>
                <p style={{ color: "white" }}>High Quality is our first priority</p>

                <p style={{ color: "white" }}>Copyrights 2021 &copy; Rakesh Kundu</p>
            </Box>
            <Box className={classes.rightFooter}>
                <Typography variant='h6' sx={{ textDecoration: 'underline', color: "white" }}>Follow Us</Typography>
                <Stack spacing={2} mt={4}>
                    <a style={{ textDecoration: 'none', color: "white" }} href="http://instagram.com/">Instagram</a>
                    <a style={{ textDecoration: 'none', color: "white" }} href="http://youtube.com/">Youtube</a>
                    <a style={{ textDecoration: 'none', color: "white" }} href="http://facebook.com/">Facebook</a>
                </Stack>
            </Box>
        </Stack >
    )
}

export default Footer