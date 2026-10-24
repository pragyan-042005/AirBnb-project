const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require('multer');
const {storage} = require("../cloudeconfig.js");
const upload = multer({storage});



router.route("/")
.get(wrapasync(listingController.index))
.post(
isLoggedIn,
upload.single("listing[image]"),
validateListing,
wrapasync(listingController.createListing)
);

//new route
router.get("/new" ,isLoggedIn,listingController.rendernewform);

router.route("/:id")
.get(wrapasync(listingController.showListing))
.delete(isLoggedIn,wrapasync(listingController.destroylisting))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing , wrapasync(listingController.UpdateListing));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapasync(listingController.rendereditform)
);


module.exports = router;