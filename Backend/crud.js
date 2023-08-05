
const db = require('./database');


function insertData(name, description) {
  return new Promise((resolve, reject) => {
    const sql ='INSERT INTO userdetails.employee (name, description) VALUES (?, ?)';
    db.query(sql, [name, description], (err, result) => {
      if (err) {
        reject({ error: 'Error performing insert operation', message: err.message });
      } else {
        resolve(result);
      }
    });
  });
}

function getDataById(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM userdetails.employee WHERE id = ?;';
    db.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function getAllData() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM  userdetails.employee';
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


function updateData(id, name,description) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE userdetails.employee SET name = ?,description= ? WHERE id = ?';
    db.query(sql, [name,description,id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


function deleteData(id){
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM userdetails.employee WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


module.exports = { insertData, updateData, deleteData ,getAllData, getDataById};
