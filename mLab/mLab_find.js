var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://Recipe:Recipe@recipe.z3l1i.mongodb.net/Recipe?retryWrites=true&w=majority';

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    var dbase = db.db("aplwebdemo");
    dbase.collection("newCollection").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
