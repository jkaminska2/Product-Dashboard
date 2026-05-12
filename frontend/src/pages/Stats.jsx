import { useEffect, useState } from 'react';

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) return <div>Loading stats...</div>;

  return (
    <div>
      <h2>Stats</h2>
      <p>Total products: {stats.totalItems}</p>
      <p>Backend instance ID: {stats.instanceId}</p>
      <p>Server uptime (s): {stats.uptime}</p>
      <p>Requests handled: {stats.requestCount}</p>
      <p>Server time: {stats.serverTime}</p>
    </div>
  );
}