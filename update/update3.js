var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/course', function (err, db) {
	if (err) throw err

	var query = { 'assignment': 'hw1' }
	var operator = {
		'$unset': { 'date_returned': '' }
	}
	var options = { 'multi': true }

	db.collection('grades').update(query, operator, options, function (err, doc) {
		if (err) throw err

		console.dir('Successfully updated ' + doc + ' documents')

		return db.close()
	})
})
