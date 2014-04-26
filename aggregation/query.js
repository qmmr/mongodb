var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/usa', function (err, db) {
	if (err) throw err

	var query = [
		{
			$match: {
				state: 'NY'
			}
		},
		{
			$group: {
				_id: '$city',
				population: {
					$sum: '$pop'
				},
				zips: {
					$addToSet: '$_id'
				}
			}
		},
		{
			$project: {
				_id: 0,
				city: '$_id',
				population: 1,
				zips: 1
			}
		},
		{
			$sort: {
				population: -1
			}
		}
	]

	db.collection('zips').aggregate(query, function (err, docs) {
		if (err) throw err

		console.log(docs)

		db.close()
	})
})
