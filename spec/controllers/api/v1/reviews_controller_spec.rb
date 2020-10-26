require "rails_helper"

RSpec.describe Api::V1::ReviewsController, type: :controller do 
  let!(:movie) { Movie.create(
    title: "Star Wars",
    summary: "Movie from childhood",
    year: 1977
  ) }

  describe "POST#create" do
    context "when a good request (with rating) is made" do
      let!(:good_review_data) {
        { review: {rating: 5, body: "great movie!"}, movie_id: movie.id }
      }
      it "adds the rating to the database" do
        previous_count = Review.count

        post :create, params: good_review_data

        new_count = Review.count

        expect(new_count).to eq previous_count+1
      end

      it "returns the new review object as json" do

        post :create, params: good_review_data

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq ("application/json") 
        expect(returned_json). to be_kind_of(Hash) 
        expect(returned_json).to_not be_kind_of(Array) 
        expect(returned_json["rating"]).to eq 5
        expect(returned_json["body"]).to eq "great movie!"
      end
    end 
    
    context "when a bad request is made" do
      let!(:bad_review_data) {
        { review: { body: "great movie!"}, movie_id: movie.id } }
      it "should not should not save to the database" do
        previous_count = Review.count

        post :create, params: bad_review_data

        new_count = Review.count

        expect(new_count).to eq previous_count
      end
    
      it "does not successfully create a review object" do
        post :create, params: bad_review_data

        returned_response = JSON.parse(response.body)

        expect(returned_response["errors"]["rating"][0]).to eq "can't be blank"
      end
    end 
  end
end
