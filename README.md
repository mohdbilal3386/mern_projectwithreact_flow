# **Workflow Management Application**

This is a web application that allows users to create, manage, and execute workflows for basic data manipulation tasks through an intuitive, drag-and-drop interface. Users can save and load workflows, and the system executes tasks like filtering data, converting formats, and sending POST requests based on the defined workflow sequence.

## **Live Demo**

- **Live URL**: [Live Application](https://mernprojectwithreactflow-production.up.railway.app/)
- **Demo Preview**:
  ![Workflow Demo](https://drive.google.com/file/d/1fb9kcvmg__9yMzDxkofdt46brD0XFhEx/view)

## **Key Features**

1. **Drag-and-Drop Interface**:
   - Users can easily add, remove, and connect nodes on the canvas using a drag-and-drop interface.
     ![Drag and Drop](https://drive.google.com/file/d/1UEHKo_ObhhT_x0fCJGJ_7f-xp7-yeVqF/view?usp=sharing)

2. **Pre-defined Nodes**:
   - Provides a variety of pre-defined nodes representing different data manipulation tasks such as filtering, converting CSV to JSON, asynchronous delays, and POST request sending.
     ![Nodes](https://drive.google.com/file/d/1TjfoRWmNXGwSJ75o3m7HTMgQTNFRiH6v/view?usp=sharing)

3. **Workflow Saving & Loading**:
   - Users can save their created workflows to local storage or the server and reload them for future use.
     ![Save Workflow](https://drive.google.com/file/d/1fZMZ21RWZk9bhk1GmxgUdsEnnY2Tm1WB/view?usp=sharing)

4. **Execution of Workflows**:
   - Workflows are executed in sequence by the backend, with node-specific actions such as data transformation, filtering, and POST requests.

## **Workflow Creation Process**

1. **Node Selection**:
   - Users can select nodes from a sidebar to define different actions in the workflow.
  
2. **Node Configuration**:
   - Nodes can be configured by providing the necessary parameters (e.g., setting up filters, configuring data conversion).

3. **Connection of Nodes**:
   - Define the flow between nodes by creating edges (connections) to map out the workflow logic.

4. **Workflow Execution**:
   - Once a workflow is defined, users can execute it. The backend will interpret the workflow and execute the associated tasks.

## **Workflow Node Types**

- **Filter Data**: Converts column values to lowercase.
- **Wait**: Introduces an asynchronous delay.
- **Convert Format**: Converts data from CSV to JSON.
- **Send POST Request**: Sends a JSON payload to a predefined URL.

## **User Authentication and Authorization**

The application includes basic user authentication and authorization:
- JWT-based user authentication to protect routes.
- Only authorized users can save, load, or execute workflows.

## **Technology Stack**

- **Frontend**: React, TypeScript, React Flow, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **API**: Axios for handling API requests between the frontend and backend.

## **Installation Instructions**

To run the project locally, follow these steps:

## Quick Start
### **1. Clone the repository**:

```
git clone  
```

For Install node modules commands:

```
npm install
```

Once the setup is complete, navigate to the project folder and start your project with:

```
npm run start
```
Your application will be accessible at http://localhost:8000
