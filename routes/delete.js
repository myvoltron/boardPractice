const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "111111",
    database: "board",
});

connection.connect();

// 삭제하기 
router.post('/', (req, res) => {
    const id = req.body.id;
    const sql = `delete from board where id=${id}`; 
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(`${id} 삭제됨`);
        res.redirect('/board'); 
    }); 
}); 

module.exports = router;