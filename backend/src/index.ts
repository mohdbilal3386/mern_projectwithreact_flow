import mongoose from "mongoose";
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import workflowRoutes from "./routes/workflowRoutes";
import "dotenv/config";
import authRouter from "./routes/authRoutes";
import path from "path";
const app = express();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to MongoDB DataBase");
  } catch (err: unknown) {
    if (err instanceof Error)
      console.log("Problem while connecting to mongodb:", err.message);
  }
};

connectToMongoDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  express.static(path.resolve(__dirname, "..", `${process.env.PUBLIC_DIR}`))
);
app.use("/", authRouter);
app.use("/", workflowRoutes);
app.use("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});
app.listen(process.env.PORT, () =>
  console.log("Server listening on port:", process.env.PORT)
);
