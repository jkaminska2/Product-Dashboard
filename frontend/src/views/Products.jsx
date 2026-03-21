import React, { useEffect, useState } from 'react';
import { fetchItems, createItem } from '../api';

export default function Products() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const load = async () => {
    try {
      const data = await fetchItems();
      setItems(data.items);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) return;
    try {
      await createItem({ name, price: Number(price) });
      setName('');
      setPrice('');
      await load();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Products</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <div>
          <label>
            Name:{' '}
            <input value={name} onChange={e => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Price:{' '}
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add product</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            #{item.id} {item.name} – {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}