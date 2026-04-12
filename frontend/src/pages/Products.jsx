import React, { useEffect, useState } from "react";

export default function Products() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const loadItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data.items);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price) || 0 }),
    });

    setName("");
    setPrice("");
    await loadItems();
  };

  return (
    <div>
      <h2>Products</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <div>
          <label>
            Name:{" "}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Price:{" "}
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add product</button>
      </form>

      <ul>
        {items.map((it) => (
          <li key={it.id}>
            {it.name} – {it.price}
          </li>
        ))}
      </ul>
    </div>
  );
}