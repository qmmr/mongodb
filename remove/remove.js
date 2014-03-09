var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/course', function (err, db) {
	if (err) throw err

	var query = {  'name': {'$regex' : '^stued' } }

	db.collection('users').remove(query, function (err, docs) {

		console.log('Successfully removed ' + docs + ' documents.')

		return db.close()
	})
})
