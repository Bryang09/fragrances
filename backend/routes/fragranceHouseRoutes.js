const express = require("express");

const router = express.Router();

const {
  getAllFragranceHouse,
  getFragranceHouse,
  createFragranceHouse,
  updateFragranceHouse,
  deleteFragranceHouse,
  updateFragranceHouseFragrances,
} = require("../controllers/fragranceHouseController");

router.get("/", getAllFragranceHouse);
router.get("/:id", getFragranceHouse);
router.post("/", createFragranceHouse);
router.patch("/:id", updateFragranceHouse);
router.patch("/fragrances/:id", updateFragranceHouseFragrances);
router.delete("/:id", deleteFragranceHouse);

module.exports = router;
