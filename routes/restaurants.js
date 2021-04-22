const express = require("express");
const {
  getRests,
  get_Rest,
  updateRest,
  deleteRest,
  createRest,
} = require("../controllers/restaurants");
const router = express.Router();
router.post("/", createRest);
router.get("/", getRests);
router.get("/:id", get_Rest);
router.patch("/:id", updateRest);
router.delete("/:id", deleteRest);
module.exports = router;
