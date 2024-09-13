import React, {
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addEdge,
  Background,
  Controls,
  //  Node,
  //  Edge,
  MiniMap,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  // Position,
} from "@xyflow/react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import { AppContext } from "../../context/AppContext";
import styles from "./Workflow.module.css";
import axios from "axios";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "start",
    data: { label: "Start" },
    position: { x: 250, y: 0 },
    // sourcePosition: Position.Bottom,
    // targetPosition: Position.Bottom,
  },
];

export interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface WorkflowResponse {
  nodes: Node[];
  edges: Edge[];
}

const initialEdges: Edge[] = [];

const Workflow: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodeType } = useContext(AppContext);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
  const [workflows, setWorkflows] = useState<string[]>([]);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(
    null
  );
  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!nodeType) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: uuidv4(),
        type: nodeType,
        position,
        data: {
          label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}`,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodeType, screenToFlowPosition, setNodes]
  );

  const saveWorkflow = async () => {
    const savedWorkflow = { nodes, edges };
    try {
      await axios.post(
        "/save",
        { ...savedWorkflow },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(`Please save this ID to check again.`);
      fetchWorkflows();
    } catch (error) {
      console.error("Error saving workflow:", error);
      alert("Error saving workflow.");
    }
  };

  const loadWorkflow = async () => {
    console.log({ selectedWorkflowId });
    if (!selectedWorkflowId) {
      alert("Please select a workflow ID.");
      return;
    }

    try {
      const response = await axios.get<WorkflowResponse>(
        `/workflows/${selectedWorkflowId}`
      );
      const { nodes: loadedNodes, edges: loadedEdges } = response.data;
      setNodes(loadedNodes);
      setEdges(loadedEdges);
    } catch (error) {
      console.error("Error loading workflow:", error);
      alert("Error loading workflow. Ensure the ID is correct.");
    }
  };

  const deleteNode = (nodeLabel: string) => {
    const nodeToDelete = nodes.find((node) => node.data.label === nodeLabel);
    if (!nodeToDelete) {
      alert(`No node found with label: ${nodeLabel}`);
      return;
    }

    const nodeId = nodeToDelete.id; // Find node by label and get its ID
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const fetchWorkflows = async () => {
    try {
      const response = await axios.get("/workflows");
      const workflowsData = response.data.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (workflow: { _id: any }) => workflow._id
      );
      setWorkflows(workflowsData);
    } catch (error) {
      console.error("Error fetching workflows:", error);
    }
  };
  const promptForNodeDeletion = (): string | null => {
    const nodeLabels = nodes.map((node) => node.data.label);
    const nodeLabelString = nodeLabels.join(", ");

    const selectedLabel = prompt(
      `Available nodes: ${nodeLabelString}\nEnter the label of the node you wish to delete:`
    );

    return selectedLabel && nodeLabels.includes(selectedLabel)
      ? selectedLabel
      : null;
  };
  console.log({ workflows });

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.reactFlowWrapper} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        <div className={styles.buttonsWrapper}>
          <button
            className={`${styles.button} ${styles.saveButton}`}
            onClick={saveWorkflow}
          >
            Save Workflow
          </button>
          <button
            className={`${styles.button} ${styles.loadButton}`}
            onClick={loadWorkflow}
          >
            Load Workflow
          </button>
          <select
            value={selectedWorkflowId || ""}
            onChange={(e) => setSelectedWorkflowId(e.target.value)}
            className={styles.workflowSelect}
          >
            <option value="">Select Workflow</option>
            {workflows.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              const selectedLabel = promptForNodeDeletion();
              if (selectedLabel) deleteNode(selectedLabel);
            }}
          >
            Delete Node
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
