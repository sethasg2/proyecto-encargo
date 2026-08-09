const { createClient } = require('redis');
const client = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
client.connect().catch(()=>{});

module.exports = (keyFn, ttl = 60) => async (req, res, next) => {
  try {
    const key = typeof keyFn === 'function' ? keyFn(req) : keyFn;
    const cached = await client.get(key);
    if (cached) return res.json(JSON.parse(cached));
    // Hijack res.json to cache response
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      client.setEx(key, ttl, JSON.stringify(body)).catch(console.error);
      return originalJson(body);
    };
    next();
  } catch (err) { next(err); }
};
