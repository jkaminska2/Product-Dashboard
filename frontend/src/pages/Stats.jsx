import React, { useEffect, useState } from "react";

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [cacheStatus, setCacheStatus] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
      setCacheStatus(res.headers.get("X-Cache-Status"));
    };
    loadStats();
  }, []);

  return (
    <div>
      <h2>Stats</h2>
      {!stats && <p>Loading…</p>}
      {stats && (
        <div>
          <p>Total products: {stats.totalItems}</p>
          <p>Backend instance ID: {stats.instanceId}</p>
          <p>Nginx cache: {cacheStatus}</p>
        </div>
      )}
    </div>
  );
}