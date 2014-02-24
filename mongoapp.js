var MongoClient = require('mongodb').MongoClient

// Open the connection to the server
MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
	if (err) throw err

	// Find one document in our collection
	db.collection('users').findOne({}, function (err, doc) {
		// Print the result
		console.dir(doc)

		// Close the DB
		db.close()
	})

	// Declare success!
	console.dir('Called findOne!')
})

