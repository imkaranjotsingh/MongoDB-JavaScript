var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/kk668";
mongoose.connect(url,function(err,db){
    db.collection('customers1').insertOne({
        name:"vijay",id:27
    });
});