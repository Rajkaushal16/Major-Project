const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const{isLoggedIn, isOwner, validateListing}= require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });
 

router
.route("/")
.get(wrapAsync(listingcontroller.index))
.post(isLoggedIn, 
 upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingcontroller.createListing )
);


// NEW ROUTE 
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

 

router
.route("/:id")
.get(wrapAsync( listingcontroller.showListing))
.put(isLoggedIn,isOwner, 
  upload.single("listing[image]"),
  validateListing, 
  wrapAsync(listingcontroller.updateListing)
)
.delete(isLoggedIn,isOwner, 
  wrapAsync(listingcontroller.destroyListing));




  //EDIT ROUTE............. 
  router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingcontroller.renderEditForm));


  module.exports = router;