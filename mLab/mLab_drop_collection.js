var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://Recipe:Recipe@recipe.z3l1i.mongodb.net/Recipe?retryWrites=true&w=majority';

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    var dbase = db.db("aplwebdemo");
    dbase.dropCollection("newCollection", function (err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});
