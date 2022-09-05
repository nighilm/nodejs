const express = require('express');
const path = require('path');
const conn = require('../../conn');
const upload = require('../../upload');
const router = express.Router();

router.get('/', (req, res, next) => {
    const id = req.query.id;
    if (!id){
        next();
    } else{
        const sql = `SELECT * FROM persons WHERE id = ? `;
        conn.query(sql,[id],(err, result) => {
          if (err || result == 0) {
              res.status(200).json({
                 errorMessage: 'User does not exist!',
                 error: err
                }); 
            } else {
                  res.status(200).json({
                     userDetails: result
                    });
                console.log(result);
            }
        })
    }
});

router.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM persons ';   
    conn.query(sql, (err,result) => {
        if (err) {
            res.status(200).json({
                errorMessag: 'Table is empty',
                error: err
            });
        } else {
            res.status(200).json({
                tableDetails: result
            });
            console.log(result);
        }
    });
});

router.post('/query', (req , res ,next) => {
    const response = {
        name: req.query.name,
        age: req.query.age
    }
      
    const sql = `INSERT INTO persons (name,age) VALUES ( ?, ?)`;
    
    conn.query(sql,[response.name, response.age] ,(err, result) => {  
        if (err) {
            res.status(400).json({
                errorMessage: 'ERROR',
                error: err
            });
        } else {
            res.status(201).json({
                message: 'Data inserted successfully'
            })
            console.log('Number of records inserted : ' + result.affectedRows);
        }  
    });
});

router.post('/body', (req, res, next) => {
  
    const response = {
        name: req.body.name,
        age: req.body.age
    }
    console.log(response);
    const sql = `INSERT INTO persons (name,age) VALUES ( ?, ?)`;

    conn.query(sql,[response.name, response.age] ,(err, result) => {  
        if (err) {
            res.status(400).json({
                errorMessage: 'ERROR',
                error: err
            });
        } else {
            res.status(201).json({
                message: 'Data inserted successfully'
            })
            console.log('Number of records inserted : ' + result.affectedRows);
        }
    });
});

router.post('/form-data-file', upload.single('image'),(req , res ,next) => {
    
    const filePath = path.join('D:\\Nighil\\JS\\nodejs\\express\\images\\',req.file.filename);
    console.log(filePath);
    const sql = `INSERT INTO files (image) VALUES ( ?)`;
    
    conn.query(sql ,[filePath] ,(err, result) => {  
        if (err) {
            res.status(400).json({
                errorMessage: 'ERROR',
                error: err
            });
        } else {
            res.status(201).json({
                message: 'Image uploaded successfully'
            });
            console.log('Number of records inserted : ' + result.affectedRows);
        }
    });
});

router.put('/', (req, res, next) => {
    const id = req.query.id;
    const name = req.query.name;
    const age = req.query.age;

    const sql = `UPDATE persons SET name = ?, age = ? WHERE id = ? ; `;
 
    conn.query(sql, [name, age ,id], (err,result) => {
        if (err || result.affectedRows == 0) {
            res.status(400).json({
                errorMessage: 'Error updating the row.',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Row updated successfully.'
            });
            console.log(result);
        }
     })
 });

router.delete('/', (req, res, next) => {
   const id = req.query.id;
   const sql = `DELETE  FROM persons WHERE id = ? ; `;

   conn.query(sql, [id], (err,result) => {
       if (err || result.affectedRows == 0) {
            res.status(400).json({
                errorMessage: 'Error deleting the row.',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Row deleted successfully.'
            });
            console.log(result);
        }
    })
});

module.exports = router ;