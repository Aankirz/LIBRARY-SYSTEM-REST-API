const express=require('express');
const mongoose=require("mongoose");
const dotenv=require('dotenv');
const cors=require('cors');
const app=express();


dotenv.config();

const port= 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/*Connecting Mongoose to mpngoDB */
mongoose.connect("mongodb+srv://Aankirz:uB!Ua74gXxMe!ME@cluster0.xk666wz.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("Successfully connected to mongoDB"))
.catch((err)=>{
console.log(err);
})



app.listen(port,async ()=>{
    console.log(`Server is running at ${port}`);
})


app.get('/',function(req,res){
    res.send("Hello World, Hii");
})

/*Route to check details of a book */
app.get('/:id',(req,res)=>{
    books.find({bookId:req.body.bookId},{ _id: 0, __v: 0 },(err,data)=>{
        if(err){
            res.send(err)
        }
        res.json(data);
    })
})

/*Deleting a book */
app.get('/delete/:id',(req,res)=>{
    books.deleteOne({bookId:req.body.bookId})
})
const books=require('./model/model');

/*Post route */
app.post('/post',function(req,res){
    
    const book=new books({
        bookId:req.body.bookId,
        bookName:req.body.bookName,
        authorName:req.body.authorName,
        lentStatus:req.body.lentStatus,
        lentOn:req.body.lentOn,
        lentTo:req.body.lentTo
    });

    books.countDocuments(
      {bookId:req.body.bookId},
      (err,count)=>{
        if(count>0){
           /* Updating a book */
        books.findOneAndUpdate(
            {bookId:req.body.bookId},{$set:{authorName:"Aankirz"}},{upsert:true},function(err,doc){
                if(err){
                    throw err;
                }else
                console.log("Updated")
            }
        )

           

        }else{
            /*Adding a book*/
            book.save((err,books)=>{
                if(err){
                    res.send(err)
                }
                res.json(books)
            })
        }
      }  

    )
})
