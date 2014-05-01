var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/test', function (err, db) {
	if (err) throw err

	db.collection('zips').findOne(function (err, doc) {
		if (err) throw err

		console.log(doc)

		db.close()
	})
})
