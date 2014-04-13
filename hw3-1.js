var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/school', function (err, db) {
	if (err) throw err

	var cursor = db.collection('students').find()
// 	var sort = []
// 	var operator = { '$inc': { 'counter': 1 } }
// 	var options = { 'new': 1 }

	cursor.each(function (err, doc) {

		if ( doc ) {
			// console.log(doc.scores.homework)
			var scores = doc.scores.map(function (score) {
				if (score.type == 'homework') {
					return score.score
				}
			}).filter(function (val) {
				return val != null
			})
			// console.log(scores)
			var smaller = Math.min.apply(null, scores)
			// console.log('smaller:' + smaller)

			var lowerIndex
			doc.scores.forEach(function (score, i) {
				// console.log(score, i)
				if (score.type == 'homework') {
					if (score.score == smaller) {
						lowerIndex = i
					}
				}
			})
			// console.log(lowerIndex, smaller)
			var update = doc.scores.splice(lowerIndex, 1)
			// console.log(doc.scores)

			var operator = {
				'$set': {
					'scores': doc.scores
				}
			}

			db.collection('students').update({ _id: doc._id }, operator, function (err, student) {
				if (err) throw err

				if (student) {
					console.log('Updated ' + student + ' student')
					// console.log('Found student with _id:' + doc._id + ':' + student._id)
					// console.log(student._id + ':' + student.name + ': now try to update his scores!')
				}
				// else {
				// 	console.log('Could not find student with _id ' + doc._id)
				// }

				if (student._id == 199) {
					return db.close()
				}
			})
		}
	})
})
