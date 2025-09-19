import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import productRouter from './routes/products.route.js'
import path from "path";
import { fileURLToPath } from "url";


const app=express();
dotenv.config();


const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);


app.use(express.json()); 

app.use("/api/products",productRouter);



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  });
