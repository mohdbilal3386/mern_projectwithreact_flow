import { model, Schema } from "mongoose";

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string };
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface WorkflowTypes {
  nodes: Node[];
  edges: Edge[];
}

// Node Schema
const nodeSchema = new Schema<Node>({
  id: { type: String, required: true },
  type: { type: String, required: true },
  position: {
    type: new Schema({
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    }),
    required: true,
  },
  data: {
    type: new Schema({
      label: { type: String, required: true },
    }),
    required: true,
  },
});

// Edge Schema
const edgeSchema = new Schema<Edge>({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
});

// Workflow Schema
const WorkflowSchema = new Schema<WorkflowTypes>({
  nodes: { type: [nodeSchema], required: true },
  edges: { type: [edgeSchema], required: true },
});

// Create the Model
export const Workflow = model<WorkflowTypes>("Workflow", WorkflowSchema);
