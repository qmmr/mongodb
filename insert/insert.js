var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/course', function (err, db) {
	if (err) throw err

	var student = { 'name': 'Steve', 'age': 19 }

	var students = [
		{ 'name': 'Joe', 'age': 17 },
		{ 'name': 'Jane', 'age': 16 }
	]

	// can insert multiple objects in one insert using array
	db.collection('users').insert(student, function (err, doc) {
		if (err) throw err

		console.log('Successfully inserted: ' + JSON.stringify(doc))

		db.close()
	})
})
