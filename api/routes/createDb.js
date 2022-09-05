const express = require('express');
const conn = require('../../conn');
const router = express.Router();

router.get('/',(req, res, next) => {
  // let sql = `DELETE  FROM  persons WHERE id = 0`;
    conn.query(sql, (err) => {
        if(err){
            throw err;
        }
        console.log('Database created successfully...');
        res.send('Database created successfully...');
    })
})

module.exports = router ;