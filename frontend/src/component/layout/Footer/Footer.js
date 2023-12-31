import React from 'react'
import { Stack, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import { useTranslation } from "react-i18next";


const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "#373F47",
        marginTop: "10vmax",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        [theme.breakpoints.down('sm')]: {
            padding: 12,
            display: "flex",
            flexDirection: "column",
            textAlign: "center"
        },
        [theme.breakpoints.down('md')]: {
            padding: 12,
            display: "flex",
            flexDirection: "column",
            textAlign: "center"
        }
    },
    leftFooter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        [theme.breakpoints.down('xs')]: {
            padding: 12,
            display: "flex",
            flexDirection: "column",
            textAlign: "center"
        }
    },
    midFooter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        [theme.breakpoints.down('xs')]: {
            padding: 12,
            display: "flex",
            flexDirection: "column",
            textAlign: "center"
        }
    },
    rightFooter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        [theme.breakpoints.down('xs')]: {
            padding: 12,
            display: "flex",
            flexDirection: "column",
            textAlign: "center"
        }
    },
    midPara: {
        margin: 2,
    }
}))

function Footer() {
    const classes = useStyles();
    const { t } = useTranslation(["footer"]);

    return (
        <Box className={classes.footer} >
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
        </Box >
    )
}

export default Footer