var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/course', function (err, db) {
	if (err) throw err

	var query = { 'student': 'Steve', 'assignment': 'hw1' }
	// var replacement = { 'student': 'Steve', 'assignment': 'hw1', 'grade': 75, 'last_updated': new Date() }
	var replacement = { '$set': { 'grade': 75, 'last_updated': new Date() } }
	var options = { 'upsert': 1 }

	db.collection('grades').update(query, replacement, options, function (err, doc) {
		if (err) throw err

		console.dir('Successfully upserted ' + doc + ' documents.')

		return db.close()
	})
})
