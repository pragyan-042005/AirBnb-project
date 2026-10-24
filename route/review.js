const express = require("express");
const router = express.Router({mergeParams: true});
const ExpressError  = require("../utils/ExpressError.js");
const wrapasync = require("../utils/wrapasync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");


const reviewController = require("../controller/review.js");



router.post("/",isLoggedIn, validateReview,wrapasync(reviewController.createreview)
);
//DELETE review route
router.delete(
    "/:reviewId",isLoggedIn,isReviewAuthor,
    wrapasync(reviewController.destroyreview)
);
module.exports = router;