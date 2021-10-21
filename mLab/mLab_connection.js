var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://Recipe:Recipe@recipe.z3l1i.mongodb.net/Recipe?retryWrites=true&w=majority';
//'mongodb+srv://Lesson7:Lesson7@lesson7.z3l1i.mongodb.net/Lesson7?retryWrites=true&w=majority';
// mongodb+srv://Lesson7:<password>@lesson7.z3l1i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        console.log("connected to server");
        db.close();
    }
);