const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const INSTANCE_ID = process.env.INSTANCE_ID || 'backend';
const startTime = Date.now();
let requestCount = 0;

let items = [];

app.use((req, res, next) => {
  requestCount += 1;
  next();
});

app.get('/items', (req, res) => {
  res.json({ items });
});

app.post('/items', (req, res) => {
  const { name, price } = req.body;
  const item = { id: items.length + 1, name, price };
  items.push(item);
  res.status(201).json({ item });
});

app.get('/stats', (req, res) => {
  const uptimeSeconds = Math.floor(process.uptime());
  const serverTime = new Date().toISOString();
  res.json({
    totalItems: items.length,
    instanceId: INSTANCE_ID,
    uptime: uptimeSeconds,
    requestCount,
    serverTime,
  });
});

app.get('/health', (req, res) => {
  const uptimeSeconds = Math.floor(process.uptime());
  res.json({
    status: 'ok',
    uptime: uptimeSeconds,
    requestCount,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}, instance ${INSTANCE_ID}`);
});