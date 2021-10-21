var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myapp';

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    var dbase = db.db("aplwebdemo");
    var myobj = [
        {title: 'Spagetti', ingredients: 'moms', instructions: 'palms r sweaty'},
        {title: 'FOOD', ingredients: 'hungry', instructions: 'dying'}
    ];
    dbase.collection("newCollection").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of records inserted: " + res.insertedCount);
        db.close();
    });
});
