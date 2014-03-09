var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/course', function (err, db) {
	if (err) throw err

	var query = { 'name': 'comments' }
	var sort = []
	var operator = { '$inc': { 'counter': 1 } }
	var options = { 'new': 1 }

	db.collection('counters').findAndModify(query, sort, operator, options, function (err, doc) {

		if ( !doc ) {
			console.log('No counter found for comments!')
		} else {
			console.dir('Number of comments: ' + doc.counter)
		}

		return db.close()
	})
})
