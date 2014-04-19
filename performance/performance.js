var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
	if (err) throw err

	var cursor = db.collection('coll').find({ 'x': 2 })

	cursor.explain(function (err, output) {
		if (err) throw err
		console.log(output)
		db.close()
	})
})
