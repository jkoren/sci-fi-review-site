require 'rails_helper'

feature "user navigates to movie home page" do
  scenario "user visits index page and sees a list of movies" do
    Movie.create!(
      title: "Star Wars",
      summary: "Movie from childhood",
      year: 1977
    )

    visit "/movies"

    expect(page).to have_content "Star Wars" 
    expect(page).to have_content "Movie from childhood" 
    expect(page).to have_content "1977" 
  end
end
