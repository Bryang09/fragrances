const express = require("express");

const router = express.Router();
const {
  createFragrance,
  getFragrances,
  getFragrance,
  updateFragrance,
  deleteFragrance,
  updateFragranceImages,
} = require("../controllers/fragranceController");

router.get("/", getFragrances);
router.get("/:id", getFragrance);
router.post("/", createFragrance);
router.delete("/:id", deleteFragrance);
router.patch("/:id", updateFragrance);
router.patch("/images/:id", updateFragranceImages);

module.exports = router;
