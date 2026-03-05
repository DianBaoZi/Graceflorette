const attempts = new Map<string, { count: number; resetAt: number }>();

const CLEANUP_THRESHOLD = 100;

function cleanup() {
  if (attempts.size <= CLEANUP_THRESHOLD) return;
  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (now > entry.resetAt) attempts.delete(key);
  }
}

/**
 * Simple in-memory rate limiter.
 * Works within a single serverless instance lifetime — effective against
 * brute-force bursts that hit the same warm instance.
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; retryAfterMs: number } {
  cleanup();

  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= maxAttempts) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, retryAfterMs: 0 };
}
