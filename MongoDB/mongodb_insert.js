var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var myobj = [
        {title: 'Spagetti', ingredients: 'moms', instructions: 'palms r sweaty'}
    ];
    var dbase = db.db("mydb");
    dbase.collection("newCollection").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of records inserted: " + res.insertedCount);
        db.close();
    });
});
