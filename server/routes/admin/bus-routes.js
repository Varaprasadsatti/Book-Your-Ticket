const express = require("express");
const {
  addBus,fetchAllBuses,editBus,deleteBus
} = require("../../controllers/admin/bus-controller");

const router = express.Router();

router.post("/add", addBus);
router.get("/get", fetchAllBuses);
router.put("/edit/:id", editBus);
router.delete("/delete/:id", deleteBus )

module.exports = router;