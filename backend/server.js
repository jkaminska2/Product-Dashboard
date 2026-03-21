const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: 'Laptop', price: 5000 },
  { id: 2, name: 'Mouse', price: 100 }
];

const instanceId = process.env.HOSTNAME || `instance-${Math.random().toString(36).slice(2, 8)}`;

app.get('/items', (req, res) => {
  res.json({ items });
});

app.post('/items', (req, res) => {
  const { name, price } = req.body || {};
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const id = items.length ? items[items.length - 1].id + 1 : 1;
  const item = { id, name, price };
  items.push(item);
  res.status(201).json(item);
});

app.get('/stats', (req, res) => {
  res.json({
    totalItems: items.length,
    instanceId
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}, instanceId=${instanceId}`);
});