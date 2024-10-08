const express=require('express');
const app = express();
const auth = require('./routes/auth');
const list = require('./routes/list');
const api = require('./routes/api');
const friends = require('./routes/friends');
const mongoose=require('mongoose');
const cors=require('cors');
const jwtVerify=require('./jwtVerify');


// environment variables
require("dotenv").config()
const port=process.env.PORT
const mongoURL=process.env.mongoURI

// middleware
 
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

// routes
app.use("/auth",auth)
app.use("/list",list)
app.use("/friends",friends) 
app.use("/api",api)


// database connection
mongoose.connect(mongoURL)
.then(()=>console.log("Connection Successful"))
.catch((err)=>console.log("Connection Failed"))

app.get('/', (req, res) => {
  const bearer=req.headers.authorization;
  if(bearer){
    const token=bearer.split(" ")[1];
    if(jwtVerify(token)){
      res.send("Hello User")
    }
  }
  res.send("Not Authorized")
}
);

// error handling
app.use((req, res, next) => {
    setImmediate(() => {
      next(res.status(404).json({message:"Something went wrong"})); 
    });
  });

// server
app.listen(port, (err) =>{
    if(err) throw err;
    console.log(`App listening at http://localhost:${port}`)
}
);
