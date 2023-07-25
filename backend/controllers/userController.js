const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const { read } = require("fs");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail");
const ErrorHander = require("../utils/errorHander.js");
const crypto = require("crypto");

const cloudinary = require("cloudinary");

//Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    // });

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        // avatar: {
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url,
        // }
    })

    sendToken(user, 201, res);
})


//Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //Checking if user has given both email and password
    if (!email || !password) {
        return next(new ErrorHander("Please provide both email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
})


//Logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})


//Get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user,
    })
})


//Update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })
})


//Get all users(admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find({})

    res.status(200).json({
        success: true,
        users,
    })
})


//Get single user details(admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(
            new ErrorHander(`User doesn't exist with id: ${req.params.id}`)
        )
    }

    res.status(200).json({
        success: true,
        user,
    })
})

//Update user role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })
})


//Delete user -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHander(`User doesn't exist with id: ${req.params.id}`)
        )
    }

    await User.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})