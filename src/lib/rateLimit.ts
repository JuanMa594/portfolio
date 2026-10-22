// Best-effort, in-memory limiter: state lives per server instance (and resets on cold start),
// which is enough for a low-traffic portfolio. A shared store is out of scope (spec 005 §6).
const hitsByKey = new Map<string, number[]>();

export function isRateLimited(key: string, maxHits: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hitsByKey.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= maxHits) {
    hitsByKey.set(key, recent);
    return true;
  }

  recent.push(now);
  hitsByKey.set(key, recent);

  // Keep the map from growing forever when many different IPs show up.
  if (hitsByKey.size > 1000) {
    for (const [storedKey, times] of hitsByKey) {
      if (times.every((time) => now - time >= windowMs)) hitsByKey.delete(storedKey);
    }
  }

  return false;
}
