import React, { useEffect, useState } from 'react';
import { fetchStats } from '../api';

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Stats</h1>
      {!stats && <p>Loading...</p>}
      {stats && (
        <div>
          <p>Total products: {stats.totalItems}</p>
          <p>Backend instance ID: {stats.instanceId}</p>
        </div>
      )}
    </div>
  );
}