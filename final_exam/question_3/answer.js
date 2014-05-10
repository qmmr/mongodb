// mongo enron < answer.js
db.messages.update(
	{ "headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>" },
	{ $addToSet: { "headers.To": "mrpotatohead@mongodb.com" } })
