const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");

router.post("/", teamController.createTeam);
router.get("/:teamTag", teamController.findTeam);

module.exports = router;
