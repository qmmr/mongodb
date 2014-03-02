var MongoClient = require('mongodb').MongoClient

// mongoimport -d course -c grades grades.json
MongoClient.connect('mongodb://127.0.0.1:27017/course', function (err, db) {
	if (err) throw err
	var query = { 'grade': 90 }

	db.collection('grades').findOne(query, function (err, doc) {
		if (err) throw err

		console.log('doc', doc)

		db.close()
	})
})
