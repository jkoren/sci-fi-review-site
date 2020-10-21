require "rails_helper"

RSpec.describe Api::V1::MoviesController, type: :controller do 
  let!(:movie1) { Movie.create(
    title: "Star Wars",
    summary: "Movie from childhood",
    year: 1977
  ) }

  let!(:movie2) { Movie.create(
    title: "Avengers: Endgame",
    summary: "end of an era",
    year: 2019 
  ) }

  describe "GET#show" do
  it "should return an movie with all its attributes" do

    get :show, params: {id: movie2.id}
    returned_json = JSON.parse(response.body)

    expect(response.status).to eq 200
    expect(response.content_type).to eq("application/json")
   
    expect(returned_json.length).to eq 6
    expect(returned_json["title"]).to eq movie2.title
    expect(returned_json["year"]).to eq movie2.year
    expect(returned_json["summary"]).to eq movie2.summary
    end
  end
end
