const express = require('express');
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
