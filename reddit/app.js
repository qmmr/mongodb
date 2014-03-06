var MongoClient = require('mongodb').MongoClient
var request = require('request')

MongoClient.connect('mongodb://127.0.0.1:27017/reddit', function (err, db) {
	if (err) throw err

	request('http://www.reddit.com/r/StartledCats/.json', function (err, res, body) {
		if (!err && res.statusCode == 200) {
			var obj = JSON.parse(body)
			var posts = obj.data.children.map(function (story) {
				return story.data
			})

			console.log(obj, posts);
		}

		db.collection('cats').insert(posts, function (err, data) {
			if (err) throw err

			console.dir(data)

			db.close()
		})
	})
})
