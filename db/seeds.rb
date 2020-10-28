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

aliens_review1_body = 'Series note: It is strongly advised that you watch this film only after seeing Alien (1979). This is a direct continuation of that story.

57 years after the events of the first film, Ellen Ripley (Sigourney Weaver) is found and awakened from hyper sleep to discover that a terraforming colony has been set up on LV-426, the planet wherein she and her fellow crew of the mining cargo spaceship Nostromo first encountered the titular aliens. When Earth-based communications loses contact with LV-426, a band of marines are sent to investigate, taking Ripley and a representative from the company that financed the colony, Carter Burke (Paul Reiser) along for the ride.

For the difficult job of following up Ridley Scott\'s excellent Alien, director James Cameron decided to go a completely different route--to make a fast moving, slightly tongue-in-cheek, boisterous action extravaganza. Remarkably, he was able to do that while still maintaining a stylistic and literary continuity that melds Aliens seamlessly with the first film.

Ripley is much more fully developed in this film, although unfortunately, some of the most significant scenes were deleted from the theatrical release (if at all possible, watch the 2-hour and 37-minute director\'s cut instead). Cameron fashioned Aliens into a grand arc where Ripley\'s actions at the end of the film have much more meaning as she\'s not only fighting monsters, but also fighting to retain a semblance of something she lost due to her 57-year hyper sleep. As in the first film, she is still the most intelligent, courageous and resourceful member of the crew, but she has much more colorful company.

The marines accompanying Ripley back to LV-426 may be too cartoonish for some tastes (as for viewers of that opinion, most of the action and the film overall is likely to be too cartoonish), but for anyone more agreeable to that kind of caricatured exaggeration, it\'s a joy to watch. I\'m a big fan of both Bill Paxton and Lance Henriksen, and both turn in wonderfully over-the-top performances, at their diametrically opposed ends of the emotional spectrum--Paxton as the spastic surfer/redneck and Henriksen as the intense, moody sage, with a surprising reality and an even more surprising conscience to go along with it. We also get a cigar-chomping Sergeant, a crazy, butch Private, and a complex, pensive Corporal as main characters, and a mysterious, bright young girl (played in a terrific performance by Carrie Henn). Much of the center section of the film hinges on the interrelationships of these characters, despite the action trappings going on around them.

Cameron carries over the crypt/labyrinth motif of the first film, and adds a metaphorical descent into the bowels of hell in the climax. The action throughout is suspenseful. Aliens contains one of my favorite "cat fights" in any film. It\'s also worth noting the influence this film may have had on Paul Verhoeven\'s Starship Troopers (1997)--although admittedly, we could say that Cameron was influenced a bit by the Robert A. Heinlein book, as well. Throughout all of the varied action sequences, as well as the important early scenes of colonists on LV-426, Cameron is able to clearly convey the logistics of very complex sets, so that viewers remain on the edges of their seats.

Part of what makes the monsters so effective is that we\'re not told too much about them. We only get glimpses into their physiology\'s, their behavioral patterns and their intelligence. Cameron gives us just enough to become wrapped up in the film, but not so much that we become overly familiar with the aliens, or start to question the logic behind the film. He also smartly carries over some devices from the first film that were abandoned to an extent, such as the acidic blood of the aliens, and he supplies answers to the few questions that the first film raised, such as why the blood doesn\'t corrode instruments and objects when a dead alien is examined.

Aliens is yet another example of a sequel that is just as good as an original film in a series. Just make sure you watch both in order, and try to watch the director\'s cuts.'

Movie.destroy_all
Review.destroy_all

star_wars = Movie.create!(title: "Star Wars", summary: star_wars_summary, year: 1986)
aliens = Movie.create!(title: "Aliens", summary: aliens_summary, year: 1986)

Review.create!(rating: 1, body: star_wars_review1_body , movie: star_wars)
Review.create!(rating: 1, body: star_wars_review2_body , movie: star_wars)
Review.create!(rating: 5, body: aliens_review1_body, movie: aliens)
