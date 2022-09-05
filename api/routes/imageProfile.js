const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const conn = require('../../conn')

router.get('/', (req, res, next) => {
    const id = req.query.id;
    const sql = 'SELECT image FROM files WHERE file_id = ? ';   
    conn.query(sql ,[id] ,(err,result) => {
        if (err) {
            res.status(200).json({
                errorMessag: 'ID not found!',
                error: err
            });
        } else {
            const image = result[0].image.substring(35);
            //res.status(200).redirect(`${image}`);
            res.status(200).json({
                filename: image
            });
            console.log(image);
        }
    });
});

module.exports = router;
