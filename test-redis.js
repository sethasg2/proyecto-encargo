const { createClient } = require('redis');

(async () => {
  const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
  const client = createClient({ url });
  client.on('error', (err) => console.error('Redis connection error:', err));
  try {
    await client.connect();
    console.log('PING ->', await client.ping());
    await client.disconnect();
  } catch (e) {
    console.error('Test failed:', e);
    process.exit(1);
  }
})();
