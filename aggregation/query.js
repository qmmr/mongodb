var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/usa', function (err, db) {
	if (err) throw err

	var query = [
		{
			$match: {
				state: 'NY'
			}
		}
	]

	db.collection('zips').aggregate(query, function (err, docs) {
		if (err) throw err

		console.log(docs)

		db.close()
	})
})
