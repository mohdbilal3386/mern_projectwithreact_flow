import { Router } from "express";
import {
  saveWorkflow,
  executeWorkflow,
  loadWorkflow,
  fetchWorkflow,
} from "../controller/workflowControllers";

const router = Router();

router.post("/save", saveWorkflow);
router.post("/execute", executeWorkflow);
router.get("/workflows/:id", loadWorkflow);
router.get("/workflows/", fetchWorkflow);
export default router;
