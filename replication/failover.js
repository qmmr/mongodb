var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/test', function (err, db) {
	if (err) throw err

	var docNum = 1;
	var insertDocument = function () {
		db.collection('repl').insert({ 'documentNumber': docNum }, function (err, doc) {
			if (err) throw err

			console.log(doc)
		})

		console.log('Dispatched insert...')
		setTimeout(insertDocument, 1000)
	}

	insertDocument()
})
