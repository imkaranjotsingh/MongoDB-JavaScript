var express  = require('express');
var path = require('path');
var routes = require('routes');
var http = require('http');
var url = require('url');
var bodyParser = require('body-Parser');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('port',process.env.PORT || 4300);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.json());
var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/mm10";
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,"js")));

app.get('/',function(req,res){
    mongoose.connect(url,function(err,db){
        db.collection("books").find({}).toArray(function(err,result){
            if(err) throw err;
            res.render('index',{data:result});
        });
    });
});

app.post('/join',function(req,res){
    mongoose.connect(url,function(err,db){
        db.collection('books').aggregate([
        {
            $match:{book_name:req.body.book}},
            {$lookup:
                {
                    from:'author',
                    localField:'book_name',
                    foreignField:'bname',
                    as:'alldetails'
                }
            },
            {$project:
                {
                    bname:'$alldetails.bname',
                    aname:'$alldetails.author_name',
                    price:1
                }
            }
        ]).toArray(function(err,result){
            if(err) throw err;
            console.log(result);
            res.render('show',{data:result});
        });
    });
});

http.createServer(app).listen(app.get('port'),function(){
    console.log('Express Server listening on port '+app.get('port'));
});