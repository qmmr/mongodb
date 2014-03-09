var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/course', function (err, db) {
	if (err) throw err

	var query = { 'assignment': 'hw1' }

	db.collection('grades').findOne(query, function (err, doc) {
		if (err) throw err

		doc['last_updated'] = new Date()

		db.collection('grades').save(doc, function (err, doc) {
			if (err) throw err

			console.dir('Successfully saved ' + doc + ' document.')

			return db.close()
		})
	})
})
