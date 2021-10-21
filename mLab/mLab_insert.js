var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://Recipe:Recipe@recipe.z3l1i.mongodb.net/Recipe?retryWrites=true&w=majority';

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    var dbase = db.db("aplwebdemo");
    var myobj = [
        {title: 'Spagetti', ingredients: 'moms', instructions: 'palms r sweaty'}
    ];
    dbase.collection("newCollection").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of records inserted: " + res.insertedCount);
        db.close();
    });
});
