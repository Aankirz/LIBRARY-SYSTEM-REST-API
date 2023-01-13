const mongoose=require("mongoose");

const books=new mongoose.Schema({
    bookId:{
        type:Number,
        required:true
    },
    bookName:{
        type:String,
        required:true
    },
    authorName:{
        type:String,
        required:true
    },
    lentStatus:{
        type:Boolean,
        required:true
    },
    lentTo:{
        type:String,
        required:true
    },
    lentOn:{
        type:Date,
        required:true
    },
});

module.exports=mongoose.model('books',books);