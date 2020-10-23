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

      expect(returned_json.length).to eq 6
      expect(returned_json["title"]).to eq movie2.title
      expect(returned_json["year"]).to eq movie2.year
      expect(returned_json["summary"]).to eq movie2.summary
    end
  end

  describe "POST#create" do
    context "when a request correct params is made" do
      let!(:good_movie_data) { { movie: {title: "Terminator", summary: "Arnold's voice", year: 1985} } }

      it "adds the movie to the database" do 
        previous_count = Movie.count

        post :create, params: good_movie_data

        new_count = Movie.count

        expect(new_count).to eq previous_count + 1
      end

      it "returns the new camper object as json" do

        post :create, params: good_movie_data

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json["title"]).to eq "Terminator"
        expect(returned_json["summary"]).to eq "Arnold's voice"
        expect(returned_json["year"]).to eq 1985
      end
    end

    context "when a malformed request is made" do
      let!(:bad_movie_data) { { movie: {summary: "Arnold's voice", year: 1985} } }

      it "should not should not save to the database" do
        previous_count = Movie.count

        post :create, params: bad_movie_data

        new_count = Movie.count

        expect(new_count).to eq previous_count
      end

      it "does not successfully create a movie object" do
        post :create, params: bad_movie_data

        returned_response = JSON.parse(response.body)

        expect(returned_response["errors"]["title"][0]).to eq "can't be blank"
      end
    end
  end
end
