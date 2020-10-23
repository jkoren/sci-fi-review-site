# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

movie = Movie.create!(title: "Star Wars", summary: "the movie of my childhood", year: 1977)

movie2 = Movie.create!(title: "Aliens", summary: "Nuke the whole site from orbit", year: 1986)

review1 = Review.create!(rating: 1, body: "This movie stinks", movie: movie)

review2 = Review.create!(rating: 5, body: "This movie rocks", movie: movie)


