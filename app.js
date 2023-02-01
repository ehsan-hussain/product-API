require ('dotenv/config');
const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const cors = require('cors');
const helmet = require ('helmet');
const jwt = require('jsonwebtoken');



//middleware
mongoose.set("strictQuery", false);
app.use (bodyParser.json());
app.use(helmet());
 app.use(cors());


// import routes 
const productRoute = require ('./routes/products');
//const apiUserRoute = require ('./routes/apiUsers');

  app.use ('/products', verifyToken ,productRoute);
  const apiUserRouter = require("./routes/apiUser");
app.use("/apiUser", apiUserRouter);
//Routes 

app.get ('/',(req,res)=>{

   res.send('we on home');
})

function verifyToken (req, res, next){
  const bearer = req.headers['authorization'];
  const token = bearer && bearer.split(' ')[1]

  if (!token) {
     return res.sendStatus(401)

  }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.sendStatus(403);
      }
      next(); 
    })
  }

 
 //connect to db
  mongoose.connect (process.env.DB_CONNECTION, ()=> console.log("connected db"));




//listening 
app.listen (3000);