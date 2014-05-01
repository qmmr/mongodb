var MongoClient = require('mongodb').MongoClient

// passing the argument w=1 we set the default write concern to 1
MongoClient.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/test?w=1', function (err, db) {
	if (err) throw err

	// write concern 1
	db.collection('repl').insert({ 'x': 1 }, function (err, doc) {
		if (err) throw err
		console.log(doc)

		// write concern 2
		db.collection('repl').insert({ 'x': 2 }, { 'w': 2 }, function (err, doc) {
			if (err) throw err
			console.log(doc)
			db.close()
		})
	})
})
