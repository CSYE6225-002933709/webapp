import express from "express";
import sequelize from "../configs/sequelize.js";
import Assignment from "../models/Assignment.js";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();
const router = express.Router();

// GET /v1/assignments - Get List of All Assignments
router.get("/v1/assignments", (req, res) => {
  console.log("/v1/assignments get called");
  // TODO: Get from db
  res.sendStatus(200);
});

// POST /v1/assignments - Create Assignment
router.post("/v1/assignments", jsonParser, (req, res) => {
  const assignment = req.body;
  console.log(assignment);
  Assignment.create(assignment)
    .then((data) => {
      // TODO: add to db
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(503);
    });
});

router.get("/v1/assignments/:id", (req, res) => {
  const assignmentId = req.params.id;
  var assignment = null;
  // TODO: Get Assignment based on id
  console.log("/v1/assignments:id get called");
  if (!assignment) {
    res.status(404).json({ error: "Assignment not found" });
  } else {
    res.json(assignment);
  }
});

router.delete("/v1/assignments/:id", (req, res) => {
  const assignmentId = req.params.id;
  // TODO : Delete assignment based on id
  console.log("/v1/assignments:id delete called");
  if (index === -1) {
    res.status(404).json({ error: "Assignment not found" });
  } else {
    res.status(204).send();
  }
});

router.put("/v1/assignments/:id", (req, res) => {
  const assignmentId = req.params.id;
  const updatedAssignment = req.body;

  // TODO : update assignmnent based on id
  console.log("/v1/assignments:id put called");

  if (index === -1) {
    res.status(404).json({ error: "Assignment not found" });
  } else {
    res.json(updatedAssignment);
  }
});

// ************* Default healthz apis *************
router.get("/healthz", (req, res) => {
  if (JSON.stringify(req.query) !== "{}") {
    res.sendStatus(400);
  }
  console.log(req.query);

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      res.sendStatus(200);
      return;
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
      res.sendStatus(503);
    });
});

router.use("*", (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache");

  res.sendStatus(405);
});

export default router;
