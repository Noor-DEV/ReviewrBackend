const express = require("express");
const {
  getRests,
  get_Rest,
  updateRest,
  deleteRest,
  createRest,
  getReviews,
  createReview,
} = require("../controllers/restaurants");
const router = express.Router();
router.post("/", createRest);
router.get("/", getRests);
router.get("/:id", get_Rest);
router.put("/:id", updateRest);
router.delete("/:id", deleteRest);

//reviews.
router.get("/:id/reviews", getReviews);
router.post("/:id/reviews", createReview);

module.exports = router;
