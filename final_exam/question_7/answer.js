var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/exam', function (err, db) {
	if (err) throw err

	var query = [
		{ $unwind: "$images" },
		{
			$group: {
				_id: null,
				images: { $addToSet: "$images" }
			}
		}
	];

	db.collection('albums').aggregate(query, function (err, docs) {
		if (err) throw err

		var images = docs[0].images;
		var orphans = [];

		for ( var i = 0; i < 100000; i++ ) {
			if ( images.lastIndexOf(i) < 0 ) {
				orphans.push(i);
			}
		}

		db.collection('images').remove({ '_id': { '$in': orphans } }, function ( err, docs ) {
			if (err) throw err

			console.log('Number of removed documents: ' + docs);

			return db.close()
		});
	});
})
