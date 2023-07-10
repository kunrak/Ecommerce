import React from 'react'
import { Stack, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import { useTranslation } from "react-i18next";


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
    const { t } = useTranslation(["footer"]);

    return (
        <Stack direction="row" className={classes.footer} >
            <Box className={classes.leftFooter} textAlign="center">
                <h4 style={{ color: "white" }}>{t("downloadText")}</h4>
                <h5 style={{ color: "white" }}>{t("avialabilityText")}</h5>
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
                    {t("footerHeading")}
                </Typography>
                <p style={{ color: "white" }}>{t("qualityText")}</p>

                <p style={{ color: "white" }}>{t("copyrightText")}</p>
            </Box>
            <Box className={classes.rightFooter}>
                <Typography variant='h6' sx={{ textDecoration: 'underline', color: "white" }}>{t("followText")}</Typography>
                <Stack spacing={2} mt={4}>
                    <a style={{ textDecoration: 'none', color: "white" }} href="http://instagram.com/">{t("instagram")}</a>
                    <a style={{ textDecoration: 'none', color: "white" }} href="http://youtube.com/">Youtube</a>
                    <a style={{ textDecoration: 'none', color: "white" }} href="http://facebook.com/">{t("facebook")}</a>
                </Stack>
            </Box>
        </Stack >
    )
}

export default Footer