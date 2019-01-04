const express = require('express'),
    path = require('path'),
    bodyparser = require('body-parser'),
    http = require('http'),
    mg = require('mongodb').MongoClient,
    mongourl = 'mongodb://localhost:27017',
    app = express();


http.createServer(app).listen(process.env.PORT || 5000, () => console.log('Express server listening on ' + 5000));

app.use(bodyparser.json()); //Парсить json
app.use(bodyparser.urlencoded({ extended: true })); //Парсить данные форм
app.use(express.static(__dirname + '/')); //
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.get('/', function(req,res) {
    res.render('page');
})
app.get('/orders', function(req,res) {
    res.render('orders');
})
app.get('/test', function(req, res) {
    res.render('test')
})

app.get('/new-year', function (req, res) {
    res.render('page')    
})

app.post('/newmessage', function(req,res){
    console.log(req.body);
    mg.connect(mongourl, (err, client) => {
        let db = client.db('chat').collection('msgs');        
        db.insertOne(req.body, (err, ress) => {
            console.log(ress.ops[0].text);
            res.send(ress.ops[0].text);
        })
    })  
    
});


app.get('/createYear', function(req,res) {
    let day = {};
    day.date = new Date().getDate();
    day.month = new Date().getMonth() + 1;
    day.year = new Date().getFullYear();
    day.dayOfWeek = new Date().getDay();
    day.tasks = [];
    day.taskCounter = day.tasks.length;
    day.status = 0;
    mg.connect('mongodb://localhost:27017/mydb', function (err, db) {
        db.days.insertOne(day, function (err, result) {
            if (!err) {
                res.send = 200;
            } res.send = 404;
        })
    })
    console.log( day);
    
})

//require('./router')(app, mg);