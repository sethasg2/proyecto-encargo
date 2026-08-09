const app = require('./app');
const User = require('./models/userModel');

const PORT = process.env.PORT || 4000;

(async () => {
  // Seed admin user en memoria (solo demo)
  await User.seedAdmin();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente 🚀' });
});
