# Homework 5
## Homework: Homework 5.1 (Hands On)

Finding the most frequent author of comments on your blog
In this assignment you will use the aggregation framework to find the most frequent author of comments on your blog. We will be using the same basic dataset as last week, with posts and comments shortened considerably, and with many fewer documents in the collection in order to streamline the operations of the Hands On web shell. 

Use the aggregation framework in the web shell to calculate the author with the greatest number of comments. 

To help you verify your work before submitting, the author with the fewest comments is Cody Strouth and he commented 68 times. 

Once you've found the correct answer with your query, please choose your answer below for the most prolific comment author. 

Note: this data set is relatively large. Due to some quirks of the shell, the entire result set gets pulled into the browser on find(), so if you want to see the document schema, we recommend either using db.posts.findOne(), db.posts.find().limit(1), or that you plan on waiting for a bit after you hit enter. We also recommend that the last phase of your aggregation pipeline is {$limit: 1} (or some single digit number) 

### Answer
    db.posts.aggregate([
        { $unwind: "$comments" },
        { $group: { _id: "$comments.author", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
    ])

## 2
---
## 3
db.grades.aggregate([{ $unwind: "$scores" }, {$match: { $or: [{"scores.type": "homework"},{"scores.type":"exam"}] } }, {$group: { _id: { 'student_id': "$student_id", 'class_id': "$class_id"}, avg: { $avg: "$scores.score" } } }, {$group: { _id: "$_id.class_id", class_avg: { $avg: "$avg" } } }, {$sort: { 'class_avg': -1 } }])
---
## 4
db.zips.aggregate([ {$project: { _id: 0, city: 1, pop: 1 } }, {$match: { city: /^\d.*/ } }, {$group: { _id: null, pop: {$sum: "$pop" } } }, {$sort: { city: 1} } ])
{ "_id" : null, "pop" : 298015 }
