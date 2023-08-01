import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { Box } from "@mui/material";
import Loader from "../Loader/Loader";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import Header from "../Header/Header";

const useStyles = makeStyles({

})

const Profile = ({ history }) => {
    const { t } = useTranslation(["home"]);
    const classes = useStyles();

    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    // useEffect(() => {
    //     if (isAuthenticated === false) {
    //         navigate("/login");
    //     }
    // }, [navigate, isAuthenticated]);

    console.log(isAuthenticated);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Box className="profileContainer">
                        <Box>
                            <h1>{t('myProfile')}</h1>
                            <img src={"/Profile.png"} alt={user.name} />
                        </Box>
                        <Box>
                            <Box>
                                <h4>{t("fullName")}</h4>
                                <p>{user.name}</p>
                            </Box>
                            <Box>
                                <h4>{t('email')}</h4>
                                <p>{user.email}</p>
                            </Box>
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
};

export default Profile;