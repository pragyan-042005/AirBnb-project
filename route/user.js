const express = require("express");
const wrapasync = require("../utils/wrapasync");
const router = express.Router({mergeParams: true});
const User  = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const { route } = require("./listing.js");

const userController = require("../controller/user.js");

router.route("/signup")
.get(userController.rendersignupform)
.post(
    wrapasync(userController.signup)
);

router.route("/login")
.get(
    saveRedirectUrl,userController.renderloginform)
.post( passport.authenticate("locals", {
    failureRedirect:"/login",
    failuerFlash: true,
}), userController.login);    





router.get("/logout",userController.logout);


module.exports = router;