const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Inwares',{useNewUrlParser:true},(err) =>{
    if(!err){
        console.log('Connection to mongodb is Done!! ')
    }else{
        console.log('An Error !,failed to connect:'+err);
    }
});
require('./parent.model');