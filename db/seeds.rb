# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


star_wars_summary = 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.'

star_wars_review1_body = '"A long time ago, in a galaxy far, far away..."'

star_wars_review2_body = 'Only seen the original Star Wars films a few times, I tend to forget how great of a magical experience it is! A New Hope is so awesome in so many aspects especially the music and sounds of everything! It\'s amazing how it was made for it\'s time I still I don\'t understand how they did many things. I will admit it has a few bits that are boring but still glorious. Up until a few years ago I didn\'t see most of the films and I didn\'t understand the hype now I do in which I\'m happy with them all even seen the new ones.'

aliens_summary = 'Ellen Ripley is rescued by a deep salvage team after being in hypersleep for 57 years. The moon that the Nostromo visited has been colonized, but contact is lost. This time, colonial marines have impressive firepower, but will that be enough?'

aliens_review1_body = 'Series note: It is strongly advised that you watch this film only after seeing Alien (1979). This is a direct continuation of that story. 57 years after the events of the first film, Ellen Ripley (Sigourney Weaver) is found and awakened from hyper sleep to discover that a terraforming colony has been set up on LV-426, the planet wherein she and her fellow crew of the mining cargo spaceship Nostromo first encountered the titular aliens. When Earth-based communications loses contact with LV-426, a band of marines are sent to investigate, taking Ripley and a representative from the company that financed the colony, Carter Burke (Paul Reiser) along for the ride.'

user2 = User.new(email: "cr@gmail.com", first_name: "Chris", last_name: "Rackey", username: "Crackey")
user2.password = "blahblah"
user2.save 

user1 = User.new(email: "brack@gmailcom", first_name: "Red", last_name: "Braken", username: "B.Racken")
user1.password = "blahblahblah"
user1.save

star_wars = Movie.create!(title: "Star Wars", summary: star_wars_summary, year: 1986)
aliens = Movie.create!(title: "Aliens", summary: aliens_summary, year: 1986)
movie = Movie.create!(title: "Aliens", summary: "Some alien stuff", year: 1986)

Review.create!(rating: 1, body: "This movie stinks", movie: movie, user: user2)
Review.create!(rating: 5, body: "This movie rocks", movie: movie, user: user1)
Review.create!(rating: 1, body: star_wars_review1_body, movie: star_wars, user: user1)
Review.create!(rating: 1, body: star_wars_review2_body, movie: star_wars, user: user1)
Review.create!(rating: 5, body: aliens_review1_body, movie: aliens, user: user1)



