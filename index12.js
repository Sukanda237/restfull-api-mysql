const express = require('express');
const app = express();

//memanggil file database yang ada di config
// const koneksi = require('./config/database');
// const PORT = process.env.PORT || 5000;

// berfungsi untuk menangkap inputan dari form body html 
const bodyParser = require('body-parser');

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello')
});

app.listen(5000, () => console.log(`Server running at http://localhost:5000`));
