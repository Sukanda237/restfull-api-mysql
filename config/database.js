const mysql = require('mysql');

// membuat koneksi kedatabase 
const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express-crud',
    // multipleStatements: true
});

// koneksi kedatabase 
koneksi.connect((err) => {
    if (err) throw err;
    console.log('MYSQL Connected...');
});

// berfungsi untuk mengexport variabel koneksi yang telah dibuat agar bisa digunkan di index.js 
module.exports = koneksi;