import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import styles from "./Sidebar.module.css"; // Import the themed CSS module

const Sidebar: React.FC = () => {
  const appContext = useContext(AppContext);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    appContext.setNodeType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={styles.sidebar}>
      <div
        onDragStart={(event) => onDragStart(event, "start")}
        draggable
        className={styles.draggableItem}
      >
        Start
      </div>
      <div
        onDragStart={(event) => onDragStart(event, "filterData")}
        draggable
        className={styles.draggableItem}
      >
        Filter Data
      </div>
      <div
        onDragStart={(event) => onDragStart(event, "waitNode")}
        draggable
        className={styles.draggableItem}
      >
        Wait
      </div>
      <div
        onDragStart={(event) => onDragStart(event, "convertFormat")}
        draggable
        className={styles.draggableItem}
      >
        Convert Format
      </div>
      <div
        onDragStart={(event) => onDragStart(event, "sendPostRequest")}
        draggable
        className={styles.draggableItem}
      >
        Send POST Request
      </div>
      <div
        onDragStart={(event) => onDragStart(event, "end")}
        draggable
        className={styles.draggableItem}
      >
        End
      </div>
    </aside>
  );
};

export default Sidebar;
