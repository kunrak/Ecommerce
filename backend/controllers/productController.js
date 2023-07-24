const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHander = require("../utils/errorHander");

//Create Product  - Admin
exports.createProduct = catchAsyncErrors(
    async (req, res, next) => {
        req.body.user = req.user.id;

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product,
        });
    }
)

//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    // let products = await apiFeature.query;

    // let filteredProductsCount = products.length;

    // apiFeature.pagination(resultPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        // filteredProductsCount
    })
})

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    })
})

//Update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}
)

//Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    await Product.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: false,
        message: "Product Deleted Successfully"
    })
})


//Create new review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    })

    product.ratings = avg / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
    })
})