# Homework 5
## 1
---
## 2
---
## 3
db.grades.aggregate([{ $unwind: "$scores" }, {$match: { $or: [{"scores.type": "homework"},{"scores.type":"exam"}] } }, {$group: { _id: { 'student_id': "$student_id", 'class_id': "$class_id"}, avg: { $avg: "$scores.score" } } }, {$group: { _id: "$_id.class_id", class_avg: { $avg: "$avg" } } }, {$sort: { 'class_avg': -1 } }])
---
## 4
db.zips.aggregate([ {$project: { _id: 0, city: 1, pop: 1 } }, {$match: { city: /^\d.*/ } }, {$group: { _id: null, pop: {$sum: "$pop" } } }, {$sort: { city: 1} } ])
{ "_id" : null, "pop" : 298015 }
