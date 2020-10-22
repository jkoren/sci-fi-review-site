require "rails_helper"

RSpec.describe Api::V1::MoviesController, type: :controller do 
  let!(:movie) { Movie.create(
    title: "Star Wars",
    summary: "Movie from childhood",
    year: 1977
  ) }
  let!(:movie2) { Movie.create(
    title: "Arrival",
    summary: "Very sad story about parenthood",
    year: 2017
  ) }

  let!(:review1) { Review.create(
    rating: 3,
    body: "It was okay",
    movie: movie2
  )}

  let!(:review2) {Review.create(
    rating: 100,
    body: "AWESOME!",
    movie: movie2
  )}



  describe "GET#index" do
    it "should return a list of all the movies" do

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2

      expect(returned_json[0]["title"]).to eq "Star Wars"
      expect(returned_json[0]["summary"]).to eq "Movie from childhood"
      expect(returned_json[0]["year"]).to eq 1977

      expect(returned_json[1]["title"]).to eq "Arrival"
      expect(returned_json[1]["summary"]).to eq "Very sad story about parenthood"
      expect(returned_json[1]["year"]).to eq 2017

    end
  end
  describe "GET#show" do
  it "should return an movie with all its attributes" do

    get :show, params: {id: movie2.id}
    returned_json = JSON.parse(response.body)

    expect(response.status).to eq 200
    expect(response.content_type).to eq("application/json")
   

    expect(returned_json.length).to eq 5
    expect(returned_json["title"]).to eq movie2.title
    expect(returned_json["year"]).to eq movie2.year
    expect(returned_json["summary"]).to eq movie2.summary
    expect(returned_json["reviews"][0]["body"]).to eq review1.body
    expect(returned_json["reviews"][0]['rating']).to eq review1.rating
    expect(returned_json["reviews"][1]["body"]).to eq review2.body
    expect(returned_json["reviews"][1]['rating']).to eq review2.rating

    end
  end
end
