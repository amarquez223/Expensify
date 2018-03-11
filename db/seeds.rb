# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Type.create([
	{ typename: "Purchase" },
	{ typename: "Withdrawal" },
	{ typename: "Transfer" },
	{ typename: "Payment" }
	])
Category.create([
	{ catname: "Restaurants"},
	{ catname: "Grocery"},
	{ catname: "Car"},
	{ catname: "Services"},
	{ catname: "Home"},
	{ catname: "Education"},
	{ catname: "Fun"},
	{ catname: "Travel"},
	])	

1000.times do
	Transaction.create([{
		type_id: Faker::Number.between(1, 4),
		category_id: Faker::Number.between(1, 8),
		date: Faker::Date.between(400.days.ago,180.days.from_now),
		concept: Faker::Commerce.product_name,
		amount: Faker::Number.between(50000,10000000)
		}])
end
