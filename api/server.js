require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db'); 
const authRoutes = require('./src/routes/authRoutes');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const errorHandler = require('./src/middlewares/errorHandler');


app.use(cors());
app.use(express.json());

// Route de test API
app.get('/', (req, res) => {
  res.json({ message: 'API OK 👌' });
});

// Route de test DB 
app.get('/test/db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ db: 'OK', result: rows[0].result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ db: 'ERROR', error: err.message });
  }
});

// ROUTE

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

//middelwares
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API démarrée sur http://localhost:${PORT}`);
});
