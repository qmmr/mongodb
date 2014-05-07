db.messages.aggregate([
	{ $unwind: "$headers.To" },
	{ $group: {
			_id: {
				_id: "$_id",
				headers_from: "$headers.From"
			},
			headers_to: { $addToSet: "$headers.To" }
		}
	},
	{ $project: {
		_id: "$_id._id",
		headers_from: "$_id.headers_from",
		headers_to: 1
	}},
	{ $unwind: "$headers_to" },
	{ $group: {
		_id: {
			from: "$headers_from",
			to: "$headers_to"
		},
		count: {
			$sum: 1
		}
	}},
	{ $sort: { count: -1 }},
], { allowDiskUse: true })
