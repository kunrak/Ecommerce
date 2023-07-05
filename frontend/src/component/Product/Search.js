import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  searchBox: {
    width: "100vw",
    height: "100vh",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "0%",
    left: 0,
  },
  searchInput: {
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.274)",
    backgroundColor: "white",
    border: "none",
    color: "rgba(0, 0, 0, 0.637)",
    padding: "1vmax 2vmax",
    width: "50%",
    outline: "none",
    borderRadius: "0%",
    fontFamily: "cursive",
    fontWeight: 300,
    fontSize: "1.1vmax",
    boxSizing: "border-box",
    height: "8%",
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    //   fontSize: "4vw",
    //   height: "10%",
    // },
  },
  searchButton: {
    height: "8%",
    borderRadius: "0%",
    backgroundColor: "tomato",
    border: "none",
    padding: "1vmax",
    width: "10%",
    fontFamily: "Roboto",
    fontWeight: 300,
    fontSize: "1.1vmax",
    cursor: "pointer",
    color: "white",
    transition: "all 0.5s",
    "&:hover": {
      backgroundColor: "rgb(55, 97, 214)",
    },
    // [theme.breakpoints.down("sm")]: {
    //   height: "10%",
    //   width: "30%",
    //   fontSize: "4vw",
    // },
  },
}));


const Search = () => {
  let navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const classes = useStyles();

  return (
    <>
      <form className={classes.searchBox} onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          className={classes.searchInput}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" className={classes.searchButton} />
      </form>
    </>
  );
};

export default Search;
