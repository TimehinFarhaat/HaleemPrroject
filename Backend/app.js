// backend/app.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
app.use(cors());
const { getDataById, getAllData,insertData ,deleteData,updateData} = require('./crud');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://127.0.0.1:5500',

}));

// Serve static files from the "public" folder
// Add Access Control Allow Origin headers
var corsOptions = {
  origin: function (origin, callback) {
    db.loadOrigins(function (error, origins) {
      callback(error, origins)
      console.log(origin);
    })
  }
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for an allowed domain.'})
})


app.use(express.static('public'));


  //Create Database
  app.get("/createdb", (req, res) => 
  {
    let sql = "CREATE DATABASE Users";
    db.query(sql, (err) => {
    if (err) 
    {
        throw err;
    }
       res.send("Database created");
    });
  
  });
  

  // Create table
  app.get("/createemployee", (req, res) => {
    let sql =
       "CREATE TABLE UserDetails.employee(id int AUTO_INCREMENT, name VARCHAR(8000),description VARCHAR(1000), PRIMARY KEY(id))";
    db.query(sql, (err) => {
      if (err) {
        throw err;
      }
      res.send("Employee table created");
    });
  
  });

app.get('/getbyId/:id', async (req,res) =>{
  try{
    const {id}=req.params;
    const dataReturned=  await getDataById(id);
    res.json(dataReturned);
  }
  catch(err) {
      res.status(500).json({ error: 'Error performing getbyId operation' });
  }
  
})

app.get('/getall', async (req,res) =>{
  try{

    const dataReturned=await  getAllData();
    res.json(dataReturned);
    console.log(dataReturned);
  }
  catch(err) {
      res.status(500).json({ error: 'Error performing geall operation' });
  }
  
})



// Insert data endpoint
app.post('/insert', async (req, res) => {
  try {
    // const {name,description } = req.body;
    const name = req.body.name;
    const description = req.body.description;
    const insertedData = await insertData(name,description);
    res.json(insertedData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error performing insert operation' });
  }
});


// Update data endpoint
app.put('/update/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const name = req.body.name;
    const description = req.body.description;
    const updatedData = await updateData(id, name,description);
    res.json(updatedData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error performing update operation' });
  }
});


// Delete data endpoint
app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await deleteData(id);
    res.json(deletedData);
    console.log(deleteData);
  } catch (err) {
    res.status(500).json({ error: 'Error performing delete operation'  });
  }
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});


const PORT =  3300;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


process.on('SIGINT', () => {
    console.log('Closing server...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });

