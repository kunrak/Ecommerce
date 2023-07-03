import React from "react";
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    display: 'grid',
    placeItems: 'center',
    maxWidth: '100%',
  },
  loadingDiv: {
    width: '10vmax',
    height: '10vmax',
    borderBottom: '5px solid rgba(0, 0, 0, 0.719)',
    borderRadius: '50%',
    animation: '$loadingRotate 800ms linear infinite',
  },
  '@keyframes loadingRotate': {
    to: {
      transform: 'rotateZ(-360deg)',
    },
  },
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.loading}>
      <Box className={classes.loadingDiv}></Box>
    </Box>
  );
};

export default Loader;
