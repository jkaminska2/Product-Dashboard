import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";

const app = express();
const port = process.env.PORT || 3000;

const items = [];
const instanceId = process.env.INSTANCE_ID || randomUUID();

app.use(cors());
app.use(express.json());

app.get("/items", (req, res) => {
  res.json({ items });
});

app.post("/items", (req, res) => {
  const { name, price } = req.body || {};
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  const item = {
    id: items.length + 1,
    name,
    price: Number(price) || 0
  };
  items.push(item);
  res.status(201).json({ item });
});

app.get("/stats", (req, res) => {
  res.json({
    totalItems: items.length,
    instanceId
  });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}, instanceId=${instanceId}`);
});