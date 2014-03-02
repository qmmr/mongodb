var MongoClient = require('mongodb').MongoClient

// mongoimport -d course -c grades grades.json
MongoClient.connect('mongodb://127.0.0.1:27017/course', function (err, db) {
	if (err) throw err

	var query = { 'grade': 90 }
	var projection = { 'student': 1, _id: 0 }
	
	db.collection('grades').find(query, projection).toArray(function (err, docs) {
		if (err) throw err

		docs.forEach(function (doc) {
			console.log('doc', doc);
			console.dir(doc.student + ' got a good grade!')
		})
		
		db.close()

	})
})
