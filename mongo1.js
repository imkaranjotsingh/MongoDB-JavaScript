var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/kk668";
mongoose.connect(url,function(err,db){
    if(err) throw err;
    console.log("Database created!!");
    db.close();
});