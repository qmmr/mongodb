var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/weather', function (err, db) {
	if (err) throw err

	var query = {}
	var operator = { '$set': { 'month_high':true } }
	// var options = { 'new': 1 }
	var sort = [['State', 1], ['Temperature', -1]]

	// var options = {
	// 	'limit': 5,
	// 	'sort': [['State', 1], ['Temperature', -1]]
	// }

	var cursor = db.collection('data').find().sort(sort)
	var currentState = ''
	var prevState = ''

	cursor.each(function ( err, doc ) {
		if (err) throw err

		var query = {}

		if (doc == null) return db.close()

		if ( doc && doc.State !== currentState ) {
			prevState = currentState
			currentState = doc.State
			console.log('change state from ' + prevState + ' to ' + currentState)

			query['_id'] = doc['_id']
			doc['month_high'] = true
			console.log(query, doc)
			db.collection('data').update(query, doc, function ( err, doc ) {
				if (err) throw err
				console.log(doc)
				// return db.close()
			})
		}

		// console.log(doc)
	})
})
