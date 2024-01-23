const express = require('express');
const app = express();

//memanggil file database yang ada di config
const koneksi = require('./config/database');
// const PORT = process.env.PORT || 5000;

// berfungsi untuk menangkap inputan dari form body html 
const bodyParser = require('body-parser');

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("this is home page");
});

//insert data
app.post('/bootcamp', (req, res) => {
    const data = { ...req.body };
    const sql = 'INSERT INTO bootcamp SET ?';

    koneksi.query(sql, data, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                message: 'Gagal menambahkan data',
                err: err
            });
        }

        res.status(200).json({
            succuss: true,
            message: 'Data berhasil ditambahkan',
            data: rows
        });
    });
});

// read data 
app.get('/bootcamp', (req, res) => {
    const querySql = 'SELECT * FROM bootcamp';

    koneksi.query(querySql, (err, rows, field) => {
        if (err) {
            return res.status(500).json({ message: 'Ada Kesalahan', error: err });
        }

        return res.status(200).json({
            success: true,
            data: rows
        });
    });
});



// read data / get data
app.get('/bootcamp', (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM bootcamp';

    // jalankan query
    koneksi.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika request berhasil
        res.status(200).json({ success: true, data: rows });
    });
});

// update data 
app.put('/bootcamp/:id', (req, res) => {
    //membuat variabel penampung data dan query sql
    const data = { ...req.body };

    const querySearch = 'SELECT * FROM bootcamp WHERE id = ?'; //artinya cari data berdasrakan id dan ? artinya id di dapat dari variabel data pada request body
    const queryUpdate = 'UPDATE bootcamp SET ? WHERE id = ?'; //artinya update data berdasrakan id dan ? artinya id di dapat dari variabel data pada request body, set nya juga di dapat dari request body

    //objek koneksi di sini merupakan koneksi kedalam database mysql yang kita buat
    koneksi.query(querySearch, req.params.id, (err, rows, field) => { //query untuk mencari data berdasar id
        if (err) { //error heandling
            res.status(500).json({
                message: 'Ada kesalahan',
                error: err,
            });
        }


        if (rows.length) { // kondisi jika pencari data berhasil
            koneksi.query(queryUpdate, [data, req.params.id], (err, rows, field) => { //query untuk mengupdate data
                if (err) { //error hendling
                    res.status(500).json({
                        message: 'terjadi kesalahan',
                        error: err,
                    });
                }

                res.status(200).json({
                    success: true,
                    message: 'data berhasil diubah',
                });
            });
        } else { //kondisi jika datanya tidak ditemukan
            res.status(400).json({
                message: 'data tidak di temukan',
                success: false
            });
        }

    });
});

// delete data 
app.delete('/bootcamp/:id', (req, res) => {

    const querySearch = 'SELECT * FROM bootcamp WHERE id = ?'; //artinya cari data berdasrakan id dan ? artinya id di dapat dari variabel data pada request body
    const queryDelete = 'DELETE FROM bootcamp WHERE id = ?'; //artinya hapus data berdasrakan id dan ? artinya id di dapat dari variabel data pada request body, set nya juga di dapat dari request body

    //objek koneksi di sini merupakan koneksi kedalam database mysql yang kita buat
    koneksi.query(querySearch, req.params.id, (err, rows, field) => { //query untuk mencari data berdasar id
        if (err) { //error heandling
            res.status(500).json({
                message: 'Ada kesalahan',
                error: err,
            });
        }


        if (rows.length) { // kondisi jika pencari data berhasil
            koneksi.query(queryDelete, req.params.id, (err, rows, field) => { //query untuk menghapus data
                if (err) { //error hendling
                    res.status(500).json({
                        message: 'terjadi kesalahan',
                        error: err,
                    });
                }

                res.status(200).json({
                    success: true,
                    message: 'data berhasil diubah',
                });
            });
        } else { //kondisi jika datanya tidak ditemukan
            res.status(400).json({
                message: 'data tidak di temukan',
                success: false
            });
        }

    });
});



app.listen(5000, () => console.log(`Server running at http://localhost:5000`));
