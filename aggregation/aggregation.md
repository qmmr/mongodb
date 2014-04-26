# Simple example
## db schema
{
	"_id" : ObjectId("50b1aa983b3d0043b51b2c52"),
	"name" : "Nexus 7",
	"category" : "Tablets",
	"manufacturer" : "Google",
	"price" : 199
}
## query
db.products.aggregate([
	{
		$group: {
			_id: "$manufacturer",
			num_products: {
				$sum: 1
			}
		}
	}
])

## counting using $sum
## schema
{
	"city" : "ACMAR",
	"loc" : [
		-86.51557,
		33.584132
	],
	"pop" : 6055,
	"state" : "AL",
	"_id" : "35004"
}
## query
db.zips.aggregate([
	{
		$group: {
			_id: "$state",
			population: {
				$sum: "$pop"
			}
		}
	}
])

## getting average data
same schema as before

## query
db.zips.aggregate([
	{
		$group: {
			_id: "$state",
			average_pop: { $avg: "$pop" }
		}
	}
])

## creating new array of of aggregated data using $addToSet
same schema

## query
db.zips.aggregate([{
	$group: {
		_id: "$city",
		postal_codes: { $addToSet: "$_id" }
	}
}])

## using $push - difference is that $push does not care if the same name is in the array

## $max and $min
## query
db.zips.aggregate([{
	$group: {
		_id: "$state",
		pop: {
			$max: "$pop"
		}
	}
}])

## using $match to filter out documents
same schema

## query
db.zips.aggregate([
	{
		$match: {
			state: 'NY'
		}
	}
])
















