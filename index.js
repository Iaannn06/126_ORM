const express = require('express');
const app = express();
const port = 3000;  
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000`);
});

db.sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
        console.log('Server Started');
        })
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

    app.post('/komik', async (req, res) => {
        const data = req.body;
        try {
            const komik = await db.Komik.create(data);
            res.status(201).json(komik);
        } catch (error) {}
            res.send({message: error.message});
 });



