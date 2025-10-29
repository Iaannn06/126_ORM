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

    app.put('/komik/:id', async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        try {
            const komik = await db.Komik.findByPk(id);
            if (!komik) {
                return res.status(404).json({ message: 'Komik not found' });
            }
            await komik.update(data);
            res.send({message: 'Komik updated successfully', komik });


        } catch (error) {}
            res.send({message: error.message});
 });

 app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik not found' });
        }                   
    } catch (error) {
        res.send({message: error.message});
    }
 }


)
