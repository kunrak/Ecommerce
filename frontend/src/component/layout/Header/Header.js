import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { AccountCircle, Logout, Search, ShoppingCart } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useEffect } from "react";
import { logout } from '../../../actions/userAction'
import { useTheme, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const options = {
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
};

const Header = () => {
    const { i18n } = useTranslation(["home"]);
    const { t } = useTranslation(["header"]);

    const dispatch = useDispatch();
    const alert = useAlert();

    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (localStorage.getItem("i18nextLng")?.length > 2) {
            i18next.changeLanguage("en");
        }
    }, []);

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    function logOutHandler() {
        dispatch(logout());
        alert.success("Logged out successfully")
    }

    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center" pl={5}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography variant="h5">{t('appName')}</Typography>
                    </Link>
                </Box>
                <Stack direction="row" display="flex" alignItems="center" spacing={4} pl={12} >
                    <Link to="/products" style={{ textDecoration: 'none' }}>
                        <Typography>{t('products')}</Typography>
                    </Link>

                    {/* Only showing the Orders and Profile route if the user is logged in */}
                    {
                        isAuthenticated && (
                            <>
                                <Link to="/orders" style={{ textDecoration: 'none' }}>
                                    <Typography>{t('orders')}</Typography>
                                </Link>
                                <Link to="/account" style={{ textDecoration: 'none' }}>
                                    <Typography>{t('profile')}</Typography>
                                </Link>
                            </>
                        )
                    }
                </Stack>
                <Box display="flex" p={2} >
                    <Stack direction="row" spacing={2} >
                        <select onChange={handleLanguageChange}>
                            <option value="en">English</option>
                            <option value="bn">Bengali</option>
                        </select>
                        <Link to="/search"><Search /></Link>
                        <Link to="/cart"><ShoppingCart /></Link>
                        {
                            !isAuthenticated && (
                                <Link to="/login"><AccountCircle /></Link>
                            )
                        }

                        {/* Switching the profile and logout button based on authentication */}
                        {isAuthenticated && (
                            <Box style={{ cursor: 'pointer' }} onClick={logOutHandler}>
                                <Logout />
                            </Box>
                        )}
                    </Stack>
                </Box>
            </Box>

            {/* Hamburger menu */}
            {isMobile && (
                <>
                    <ReactNavbar {...options} />
                </>
            )}
        </>
    );
};

export default Header;