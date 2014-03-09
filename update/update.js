var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/course', function (err, db) {
	if (err) throw err

	var query = { 'assignment': 'hw1' }

	db.collection('grades').findOne(query, function (err, doc) {
		if (err) throw err

		if ( !doc ) {
			console.log('No documents for assignment ' + query.assignment + ' found!')
			return db.close()
		}

		query['_id'] = doc['_id']
		doc['date_returned'] = new Date()

		db.collection('grades').update(query, doc, function (err, doc) {
			if (err) throw err

			console.dir('Successfuly updated ' + doc + ' document!')

			return db.close()
		})
	})
})
