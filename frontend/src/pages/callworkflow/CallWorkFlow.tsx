import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CallWorkflow.module.css";

const CallWorkflow: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [workflowId, setWorkflowId] = useState<string>("");
  const [workflows, setWorkflows] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch workflow IDs for the dropdown
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ _id: string }[]>("/workflows");
        setWorkflows(response.data.map((workflow) => workflow._id));
      } catch (error) {
        console.error("Error fetching workflows", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file || !workflowId) {
      alert("Please select a file and workflow ID.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("workflowId", workflowId);

    try {
      const response = await axios.post("/execute", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Workflow execution result: " + response.data.message);
    } catch (error) {
      console.error("Error executing workflow:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Execute Workflow</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <select
        value={workflowId}
        onChange={(e) => setWorkflowId(e.target.value)}
        disabled={loading || workflows.length === 0}
      >
        <option value="" disabled>
          Select Workflow
        </option>
        {workflows.length > 0 ? (
          workflows.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No workflows available
          </option>
        )}
      </select>
      <button
        onClick={handleSubmit}
        disabled={!file || !workflowId || loading || workflows.length === 0}
      >
        Submit
      </button>
    </div>
  );
};

export default CallWorkflow;
