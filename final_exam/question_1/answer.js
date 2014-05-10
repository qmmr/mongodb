// mongo enron < question_1/answer.js
db.messages.find({'headers.From': 'andrew.fastow@enron.com', 'headers.To': 'jeff.skilling@enron.com'}).count()
