import express from "express";
import {
  getTasksByClient,
  createTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/clients/:clientId/tasks", getTasksByClient);
router.post("/tasks", createTask);
router.patch("/tasks/:id", updateTaskStatus);

export default router;