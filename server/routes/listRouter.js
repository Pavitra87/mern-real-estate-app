const express = require("express");
const {
  createListingController,
  getListingController,
  deleteListingController,
  updateListingController,
  getListing,
  getListings
} = require("../controllers/listingController");
const verifyUser = require("../utils/verifyuser");

const router = express.Router();

router.post("/create", verifyUser, createListingController);
router.get("/listings/:id", verifyUser, getListingController);
router.delete("/delete/:id", verifyUser, deleteListingController);
router.post("/update/:id", verifyUser, updateListingController);
router.get("/get/:id", verifyUser, getListing);
router.get('/get',getListings)

module.exports = router;
