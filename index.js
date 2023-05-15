const express=require('express');
const app = express();
const auth = require('./routes/auth');
const list = require('./routes/list');
const friends = require('./routes/friends');
const mongoose=require('mongoose');




// environment variables
require("dotenv").config()
const port=process.env.PORT
const mongoURL=process.env.mongoURI

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use("/auth",auth)
app.use("/list",list)
app.use("/friends",friends)


// database connection
mongoose.connect(mongoURL)
.then(()=>console.log("Connection Successful"))
.catch((err)=>console.log("Connection Failed"))

app.get('/', (req, res) => {
    res.send('Hello World!')
}
);

// error handling
app.use((req, res, next) => {
    setImmediate(() => {
      next(res.send("Something went wrong")); 
    });
  });

// server
app.listen(port, (err) =>{
    if(err) throw err;
    console.log(`App listening at http://localhost:${port}`)
}
);
