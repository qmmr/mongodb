var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
	if (err) throw err

	// to index the coll collection we run this query in the terminal
	// db.coll.ensureIndex({x:1, y:1, z:1})

	// var cursor = db.collection('coll').find({ 'x': 2 })
	// the explain now returns 'BtreeCursor x_1_y_1_z_1'
	// but if we want to use natural query, we can give the options object
	// with hint to use $natural: 1

	var cursor = db.collection('coll').find({ 'x': 2 }, {}, { 'hint': { '$natural': 1 } })
	// and now the explain returns 'BasicCursor'

	cursor.explain(function (err, output) {
		if (err) throw err
		console.log(output)
		db.close()
	})
})
