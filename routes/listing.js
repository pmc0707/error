const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { wrapAsync } = require('../utils/WrapAsync.js');
const Listing = require("../models/listing.js")
const {isLoggedIn, isOwner,validateListing} = require("../middelware.js")
const listingController = require("../controller/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfigue.js")
const upload = multer({ storage })

//index route
router
.route("/")
.get(wrapAsync(listingController.index))
// .post(isLoggedIn,
//       validateListing,
//       wrapAsync(listingController.createListing)
//  );
.post( upload.single('listing[image]'),(req,res) => {
    res.send(req.file)
})
 //new route
router.get("/new",
    isLoggedIn,
    listingController.renderNewForm);
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validateListing,
    wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,
    wrapAsync(listingController.deleteListing));

//edit route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListing)
);


module.exports = router;