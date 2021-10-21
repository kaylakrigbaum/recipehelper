var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://Recipe:Recipe@recipe.z3l1i.mongodb.net/Recipe?retryWrites=true&w=majority';

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    var dbase = db.db("aplwebdemo");
    var myquery = {address: 'Main Road 989'};
    dbase.collection("newCollection").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        db.close();
    });
});
