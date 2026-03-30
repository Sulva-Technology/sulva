type RateLimitEntry = {
    count: number;
    resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

export function enforceRateLimit(key: string, limit: number, windowMs: number) {
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || entry.resetAt <= now) {
        store.set(key, {
            count: 1,
            resetAt: now + windowMs,
        });
        return { allowed: true, retryAfterSeconds: 0 };
    }

    if (entry.count >= limit) {
        return {
            allowed: false,
            retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
        };
    }

    entry.count += 1;
    store.set(key, entry);

    return { allowed: true, retryAfterSeconds: 0 };
}

export function getRequestClientKey(request: Request, scope: string) {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';
    return `${scope}:${ip}`;
}
