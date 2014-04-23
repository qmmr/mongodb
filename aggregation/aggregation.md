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
