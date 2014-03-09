var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/course', function (err, db) {
	if (err) throw err

	var query = { 'assignment': 'hw1' }
	var operator = {
		'$set': {
			'date_returned': new Date()
		}
	}

	db.collection('grades').update(query, operator, function (err, doc) {
		if (err) throw err

		console.dir('Successfully updated ' + doc + ' document.')

		return db.close()
	})
})
