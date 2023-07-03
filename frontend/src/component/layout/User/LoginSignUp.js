import React, { useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import { Face, LockOpen, MailOutline } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Box, Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  LoginSignUpContainer: {
    width: '100vw',
    height: '100vh',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(231, 231, 231)',
    position: 'fixed',
    top: '0%',
    left: 0,
  },
  LoginSignUpBox: {
    backgroundColor: 'white',
    width: '25vw',
    height: '70vh',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  login_signUp_toggle: {
    display: 'flex',
    height: '3vmax',
  },
  login_signUp_toggle_p: {
    color: 'rgba(0, 0, 0, 0.678)',
    font: '300 1vmax "Roboto"',
    transition: 'all 0.5s',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
    width: '100%',
    '&:hover': {
      color: 'tomato',
    },
  },
  LoginSignUpBox_div_Button: {
    backgroundColor: 'tomato',
    height: '3px',
    width: '50%',
    border: 'none',
    transition: 'all 0.5s',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    padding: '2vmax',
    justifyContent: 'space-evenly',
    height: '70%',
    transition: 'all 0.5s',
  },
  signUpForm: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    alignItems: 'center',
    margin: 'auto',
    padding: '2vmax',
    justifyContent: 'space-evenly',
    height: '70%',
    transition: 'all 0.5s',
  },

  loginForm_div: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  signUpForm_div: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  loginForm_div_input: {
    padding: '1vmax 4vmax',
    paddingRight: '1vmax',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid rgba(0, 0, 0, 0.267)',
    borderRadius: '4px',
    font: '300 0.9vmax cursive',
    outline: 'none',
  },
  signUpForm_div_input: {
    padding: '1vmax 4vmax',
    paddingRight: '1vmax',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid rgba(0, 0, 0, 0.267)',
    borderRadius: '4px',
    font: '300 0.9vmax cursive',
    outline: 'none',
  },
  loginForm_div_svg: {
    position: 'absolute',
    transform: 'translateX(1vmax)',
    fontSize: '1.6vmax',
    color: 'rgba(0, 0, 0, 0.623)',
  },
  signUpForm_div_svg: {
    position: 'absolute',
    transform: 'translateX(1vmax)',
    fontSize: '1.6vmax',
    color: 'rgba(0, 0, 0, 0.623)',
  },
  loginForm_a: {
    color: 'rgba(0, 0, 0, 0.651)',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    transition: 'all 0.5s',
    font: '500 0.8vmax "Gill Sans"',
    '&:hover': {
      color: 'black',
    },
  },
  registerImage_img: {
    width: '3vmax',
    borderRadius: '100%',
  },
  registerImage_input: {
    display: 'flex',
    padding: '0%',
  },
  registerImage_input_fileSelectorButton: {
    cursor: 'pointer',
    width: '100%',
    zIndex: 2,
    height: '5vh',
    border: 'none',
    margin: '0%',
    font: '400 0.8vmax cursive',
    transition: 'all 0.5s',
    padding: '0 1vmax',
    color: 'rgba(0, 0, 0, 0.623)',
    backgroundColor: 'rgb(255, 255, 255)',
    '&:hover': {
      backgroundColor: 'rgb(235, 235, 235)',
    },
  },
  loginBtn: {
    border: 'none',
    backgroundColor: 'tomato',
    color: 'white',
    font: '300 0.9vmax "Roboto"',
    width: '100%',
    padding: '0.8vmax',
    cursor: 'pointer',
    transition: 'all 0.5s',
    borderRadius: '4px',
    outline: 'none',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.219)',
    '&:hover': {
      backgroundColor: 'rgb(179, 66, 46)',
    },
  },
  signUpBtn: {
    border: 'none',
    backgroundColor: 'tomato',
    color: 'white',
    font: '300 0.9vmax "Roboto"',
    width: '100%',
    padding: '0.8vmax',
    cursor: 'pointer',
    transition: 'all 0.5s',
    borderRadius: '4px',
    outline: 'none',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.219)',
    '&:hover': {
      backgroundColor: 'rgb(179, 66, 46)',
    },
  },
  '@media (max-width: 600px)': {
    LoginSignUpContainer: {
      backgroundColor: 'white',
    },
    LoginSignUpBox: {
      width: '100vw',
      height: '95vh',
    },
    login_signUp_toggle: {
      height: '5vmax',
    },
    login_signUp_toggle_p: {
      font: '300 1.5vmax "Roboto"',
    },
    loginForm: {
      padding: '5vmax',
    },
    signUpForm: {
      padding: '5vmax',
    },
    loginForm_div_input: {
      padding: '2.5vmax 5vmax',
      font: '300 1.7vmax cursive',
    },
    signUpForm_div_input: {
      padding: '2.5vmax 5vmax',
      font: '300 1.7vmax cursive',
    },
    loginForm_div_svg: {
      fontSize: '2.8vmax',
    },
    signUpForm_div_svg: {
      fontSize: '2.8vmax',
    },
    loginForm_a: {
      font: '500 1.8vmax "Gill Sans"',
    },
    registerImage_img: {
      width: '8vmax',
      borderRadius: '100%',
    },
    registerImage_input_fileSelectorButton: {
      height: '7vh',
      font: '400 1.8vmax cursive',
    },
    loginBtn: {
      font: '300 1.9vmax "Roboto"',
      padding: '1.8vmax',
    },
    signUpBtn: {
      font: '300 1.9vmax "Roboto"',
      padding: '1.8vmax',
    },
  },
}));

const LoginSignUp = ({ location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    console.log("Sign Up Form Submitted")
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box className={classes.LoginSignUpContainer}>
            <Box className={classes.LoginSignUpBox}>
              <Box>
                <Box className={classes.login_signUp_toggle}>
                  <p className={classes.login_signUp_toggle_p} onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p className={classes.login_signUp_toggle_p} onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </Box>
                <Button ref={switcherTab}></Button>
              </Box>
              <form className={classes.loginForm} ref={loginTab} onSubmit={loginSubmit}>
                <Box className={classes.loginForm_div}>
                  <MailOutline className={classes.loginForm_div_svg} />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={classes.loginForm_div_input}
                  />
                </Box>
                <Box className={classes.loginForm_div}>
                  <LockOpen className={classes.loginForm_div_svg} />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={classes.loginForm_div_input}
                  />
                </Box>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className={classes.loginBtn} />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <Box className={classes.signUpForm_div}>
                  <Face className={classes.signUpForm_div_svg} />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                    className={classes.signUpForm_div_input}
                  />
                </Box>
                <Box className={classes.signUpForm_div}>
                  <MailOutline className={classes.signUpForm_div_svg} />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                    className={classes.signUpForm_div_input}
                  />
                </Box>
                <Box className={classes.signUpForm_div}>
                  <LockOpen className={classes.signUpForm_div_svg} />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                    className={classes.signUpForm_div_input}
                  />
                </Box>

                <Box id="registerImage" display="flex" alignItems="center" justifyContent="center">
                  <img className={classes.registerImage_img} src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    className={classes.registerImage_input_fileSelectorButton}
                  />
                </Box>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default LoginSignUp;
