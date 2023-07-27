import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { Box } from "@mui/material";
import Loader from "../Loader/Loader";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({

})

const Profile = ({ history }) => {
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
                            <h1>My Profile</h1>
                            <img src={"/Profile.png"} alt={user.name} />
                        </Box>
                        <Box>
                            <Box>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </Box>
                            <Box>
                                <h4>Email</h4>
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