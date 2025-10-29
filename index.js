require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;  
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sinkronisasi DB, baru jalankan server
db.sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });


// CRUD Routes
app.post('/komik', async (req, res) => {
  try {
    const data = req.body;
    const komik = await db.Komik.create(data);
    res.status(201).json({ message: 'Komik created successfully', komik });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/komik', async (req, res) => {
  try {
    const komikList = await db.Komik.findAll();
    res.json(komikList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/komik/:id', async (req, res) => {
  try {
    const komik = await db.Komik.findByPk(req.params.id);
    if (!komik) return res.status(404).json({ message: 'Komik not found' });
    res.json(komik);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/komik/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) return res.status(404).json({ message: 'Komik not found' });

    await komik.update(data);
    res.json({ message: 'Komik updated successfully', komik });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/komik/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) return res.status(404).json({ message: 'Komik not found' });

    await komik.destroy();
    res.json({ message: 'Komik deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
