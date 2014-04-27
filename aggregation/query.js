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

	var query2 = [
		{
			$group: {
				_id: {
					state: "$state",
					city: "$city"
				},
				population: {
					$sum: "$pop"
				}
			}
		},
		{
			$sort: {
				"_id.state": 1,
				"population": -1
			}
		},
		{
			$group: {
				_id: "$_id.state",
				city: {
					$first: "$_id.city"
				},
				population: {
					$first: "$population"
				}
			}
		},
		{
			$sort: {
				_id: 1
			}
		},
		{
			$project: {
				_id: 0,
				state: "$_id",
				city: 1,
				population: 1
			}
		}
	]

	db.collection('zips').aggregate(query2, function (err, docs) {
		if (err) throw err

		console.log(docs)

		db.close()
	})
})
