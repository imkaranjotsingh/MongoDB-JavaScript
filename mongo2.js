var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/kk668";

mongoose.connect(url,function(err,db){
    if(err) throw err;
    db.createCollection("customers1",function(err,res){
        if(err) throw err;
        console.log("Collection created!!");
        db.close();
    });
});