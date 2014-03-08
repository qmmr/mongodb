var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/reddit', function function_name (err, db) {
	if (err) throw err

	var query = { 'title': { '$regex': 'cat' } }
	var projection = { 'title': 1, 'url': 1, '_id': 0 }

	db.collection('cats').find(query, projection).each(function (err, doc) {
		if (doc == null) {
			return db.close()
		}

		console.log(doc)
	})
})
