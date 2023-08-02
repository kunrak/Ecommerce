import { Home, LocationCity, Phone, PinDrop, Public, TransferWithinAStation } from '@mui/icons-material';
import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Country, State } from "country-state-city";
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import CheckoutSteps from './CheckoutSteps';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    shippingContainer: {
        width: '100vw',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    shippingBox: {
        backgroundColor: 'white',
        width: '25vw',
        height: '90vh',
        boxSizing: 'border-box',
        overflow: 'hidden',
    },
    shippingHeading: {
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.664)',
        font: '400 1.3vmax "Roboto"',
        padding: '1.3vmax',
        borderBottom: '1px solid rgba(0, 0, 0, 0.205)',
        width: '50%',
        margin: 'auto',
    },
    shippingForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        padding: '2vmax',
        justifyContent: 'space-evenly',
        height: '80%',
        transition: 'all 0.5s',
    },
    shippingFormDiv: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
    shippingFormInput: {
        padding: '1vmax 4vmax',
        paddingRight: '1vmax',
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid rgba(0, 0, 0, 0.267)',
        borderRadius: '4px',
        font: '300 0.9vmax cursive',
        outline: 'none',
    },
    shippingFormSvg: {
        position: 'absolute',
        transform: 'translateX(1vmax)',
        fontSize: '1.6vmax',
        color: 'rgba(0, 0, 0, 0.623)',
    },
    shippingBtn: {
        border: 'none',
        backgroundColor: '#6C91C2',
        color: 'white',
        font: '300 1vmax "Roboto"',
        width: '100%',
        padding: '1vmax',
        cursor: 'pointer',
        transition: 'all 0.5s',
        outline: 'none',
        margin: '2vmax',
    },
    shippingBtnHover: {
        backgroundColor: 'rgb(179, 66, 46)',
    },
    '@media screen and (max-width: 600px)': {
        shippingBox: {
            width: '100vw',
            height: '95vh',
        },
        shippingHeading: {
            font: '400 6vw "Roboto"',
            padding: '5vw',
        },
        shippingForm: {
            padding: '11vw',
        },
        shippingFormInput: {
            padding: '5vw 10vw',
            font: '300 4vw cursive',
        },
        shippingFormSvg: {
            fontSize: '6vw',
            transform: 'translateX(3vw)',
        },
        shippingBtn: {
            font: '300 4vw "Roboto"',
            padding: '4vw',
        },
    },
}));

function Shipping() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector(state => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error('Phone Number must be 10 digits');
            return;
        }

        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        )

        navigate("/order/confirm");
    }

    return (
        <>
            <CheckoutSteps activeStep={0} />
            <Box className={classes.shippingContainer}>
                <Box className={classes.shippingBox}>
                    <h2 className={classes.shippingHeading}>Shipping Details</h2>

                    <form
                        className={classes.shippingForm}
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <Box className={classes.shippingFormDiv}>
                            <Home className={classes.shippingFormSvg} />
                            <input className={classes.shippingFormInput}
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Box>

                        <Box className={classes.shippingFormDiv}>
                            <LocationCity className={classes.shippingFormSvg} />
                            <input className={classes.shippingFormInput}
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Box>

                        <Box className={classes.shippingFormDiv}>
                            <PinDrop className={classes.shippingFormSvg} />
                            <input className={classes.shippingFormInput}
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </Box>

                        <Box className={classes.shippingFormDiv}>
                            <Phone className={classes.shippingFormSvg} />
                            <input className={classes.shippingFormInput}
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </Box>

                        <Box className={classes.shippingFormDiv}>
                            <Public className={classes.shippingFormSvg} />

                            <select
                                className={classes.shippingFormInput}
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </Box>

                        {country && (
                            <Box className={classes.shippingFormDiv}>
                                <TransferWithinAStation className={classes.shippingFormSvg} />

                                <select
                                    className={classes.shippingFormInput}
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </Box>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            backgroundColor='#6C91C2'
                            className={classes.shippingBtn}
                            disabled={state ? false : true}
                        />
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default Shipping