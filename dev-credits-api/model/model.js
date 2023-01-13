/*Here we will define the schema */
const mongoose=require('mongoose');
const devCredits=new mongoose.Schema({
    credits: {
        type: Number,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },

    
})

module.exports=mongoose.model('devCredits',devCredits);
/*Creating a model named devCredits */

/*
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

*/