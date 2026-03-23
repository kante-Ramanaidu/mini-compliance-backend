import express from "express";
import { getClients,  createClient } from "../controllers/clientController.js";

const router = express.Router();

router.get("/clients", getClients);
router.post("/clients", createClient);

export default router;