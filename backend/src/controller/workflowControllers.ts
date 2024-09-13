import { Request, Response } from "express";
import csvtojson from "csvtojson";
import axios from "axios";

import multer from "multer";
import { Workflow } from "../module/workflowModel";

export const saveWorkflow = async (req: Request, res: Response) => {
  try {
    const workflow = new Workflow(req.body);
    await workflow.save();
    res.status(201).json({ message: "Workflow saved", id: workflow._id });
  } catch (error) {
    res.status(500).json({ message: "Error saving workflow", error });
  }
};
const upload = multer({ dest: "uploads/" }).single("file");
export const executeWorkflow = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Error uploading file", err });
    }

    try {
      const { workflowId } = req.body;
      const file = req.file;

      console.log({ workflowId, file });
      const workflow = await Workflow.findById({ _id: workflowId }).exec();

      if (!workflow) {
        return res.status(404).json({ message: "Workflow not found" });
      }

      let data = [];
      if (file) {
        data = await csvtojson().fromFile(file.path);
      }

      for (const node of workflow.nodes) {
        switch (node.type) {
          case "filterData":
            data = data.map((row: any) => {
              Object.keys(row).forEach((key) => {
                row[key] = row[key].toString().toLowerCase();
              });
              return row;
            });
            break;

          case "waitNode":
            await new Promise((resolve) => setTimeout(resolve, 3000));
            break;

          case "convertFormat":
            break;

          case "sendPostRequest":
            await axios.post("https://requestcatcher.com", data);
            break;

          default:
            break;
        }
      }

      res.json({ message: "Workflow executed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error executing workflow", error });
    }
  });
};
export const loadWorkflow = async (req: Request, res: Response) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }
    res.status(200).json(workflow);
  } catch (error) {
    res.status(500).json({ message: "Error loading workflow", error });
  }
};

export const fetchWorkflow = async (req: Request, res: Response) => {
  try {
    const workflow = await Workflow.find();
    res.status(200).json(workflow);
  } catch (error) {
    res.status(500).json({ message: "Error loading workflow", error });
  }
};
