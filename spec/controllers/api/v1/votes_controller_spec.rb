require "rails_helper"

RSpec.describe Api::V1::VotesController, type: :controller do
  let!(:user1) {FactoryBot.create(:user)}
  let!(:user2) {FactoryBot.create(:user)}
  let!(:user3) {FactoryBot.create(:user)}  


  let!(:star_wars) {Movie.create(
    title: "Star Wars", 
    summary: "great", 
    year: 1986
  )}

  let!(:star_wars_review) {Review.create(
    movie: star_wars,
    rating: 5
  )}

  let!(:vote1) {Vote.create(
    review: star_wars_review,
    user: user1, 
    vote: -1
  )}

  let!(:vote2) {Vote.create(
    review: star_wars_review,
    user: user2, 
    vote: 1
  )}

  let!(:vote3) {Vote.create(
    review: star_wars_review,
    user: user3, 
    vote: 1
  )}

  describe "GET#index" do
    it "renders the correct amount of total votes" do
      binding.pry
      get :index
      returned_json = JSON.parse(response.body)

    end
  end

  describe "POST#create" do
  end
end