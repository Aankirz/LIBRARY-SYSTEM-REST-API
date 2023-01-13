const express=require('express');
const mongoose= require('mongoose');
const dotenv = require('dotenv');
const cors=require('cors');

const devCredits=require('./model/model');


dotenv.config();


mongoose.connect("mongodb+srv://Aankirz:uB!Ua74gXxMe!ME@cluster0.cg0lyq3.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
  .then(()=>{
    console.log("Connected to MONGO DB");
  })
  .catch((err)=>{console.log(err)})


const app=express();

const port=process.env.PORT;

app.listen(port,async ()=> console.log(`Server Running at ${port}`));

/* Adding Routes
Get : Requesting Data from the server
*/

/*Get Route */

app.get('/',(req,res)=>console.log("Hello World"));

/*Giving total dev credits of an user */
app.get('/get/:id',function(req,res){
  devCredits.find(
    {id:req.params.id},
    {_id:0,_v:0},
    (err,data)=>{
      if(err){
        res.json(err);
      }
      res.json(data);
    }
  )
})


/* But the browser will still be running, because no request was made :) */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/*Post Route */
app.post('/post',function(req,res){
  const credit=new devCredits({
    id:req.body.id,
    credits:req.body.credits

  })

  devCredits.countDocuments({id:req.body.id},function(err,count){
    if(count>0){
      devCredits.findOneAndUpdate(
        {id:req.body.id},
        {
          $inc:{
            credits:req.body.credits,
          },
        },
        {new:true},
        (err,devCredit)=>{
          if(err){
            res.send(err);
          }else res.json(devCredit);
        }
      );

    } else{
      credit.save((err,credits)=>{
        if(err){
          res.send(err);

        }
        res.json(credits);
      })
    }
  })
})


