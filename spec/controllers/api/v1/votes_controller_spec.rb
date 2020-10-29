require "rails_helper"

RSpec.describe Api::V1::VotesController, type: :controller do
  let!(:user1) {FactoryBot.create(:user)}
  let!(:user2) {FactoryBot.create(:user)}
  let!(:user3) {FactoryBot.create(:user)}
  let!(:user4) {FactoryBot.create(:user)}

  let!(:star_wars) {Movie.create(
    title: "Star Wars", 
    summary: "great", 
    year: 1986
  )}

  let!(:star_wars_review) {Review.create(
    movie: star_wars,
    rating: 5,
    user: user1
  )}

  describe "POST#create" do
    context "upon initial loading of the page" do
      it "renders the correct number of votes already present" do
        Vote.create!(user: user2, review: star_wars_review, vote: 1)
        Vote.create!(user: user3, review: star_wars_review, vote: 1)
        Vote.create!(user: user4, review: star_wars_review, vote: 1)
        post_json = {
          reviewID: star_wars_review.id,
        }
        post(:create, params: post_json, format: :json)
        returned_json = JSON.parse(response.body)

        expect(returned_json).to eq 3
      end
    end

    context "when a user upvotes" do
      it "creates a new vote" do
        post_json = {
          reviewID: star_wars_review.id,
          voteType: 1
        }
  
        sign_in user1
  
        previous_count = Vote.count
        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(previous_count + 1)
      end

      it "returns a new vote" do
        Vote.create!(user: user2, review: star_wars_review, vote: 1)
        post_json = {
          reviewID: star_wars_review.id,
          voteType: 1
        }

        sign_in user1

        post(:create, params: post_json, format: :json)
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json).to eq 2
      end

      it "alerts a user they must be signed in to vote" do
        post_json = {
          reviewID: star_wars_review.id,
          voteType: 1
        }

        post(:create, params: post_json, format: :json)
        returned_json = JSON.parse(response.body)
        expect(returned_json). to eq "You must be signed in to vote"
      end

      it "allows the user to undo their vote" do
        post_json = {
          reviewID: star_wars_review.id,
          voteType: 1
        }

        sign_in user1

        previous_count = Vote.count
        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(previous_count + 1)

        post_json = {
          reviewID: star_wars_review.id,
          voteType: 1
        }

        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(previous_count)
      end
    end

    context "when a user downvotes" do
      it "creates a new vote" do
        post_json = {
          reviewID: star_wars_review.id,
          voteType: -1
        }

        sign_in user1

        previous_count = Vote.count
        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(previous_count + 1)
      end

      it "returns a new vote" do
        Vote.create!(user: user2, review: star_wars_review, vote: 1)
        post_json = {
          reviewID: star_wars_review.id,
          voteType: -1
        }

        sign_in user1

        post(:create, params: post_json, format: :json)
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json).to eq 0
      end

      it "alerts a user they must be signed in to vote" do
        post_json = {
          reviewID: star_wars_review.id,
          voteType: -1
        }

        post(:create, params: post_json, format: :json)
        returned_json = JSON.parse(response.body)
        expect(returned_json). to eq "You must be signed in to vote"
      end

      it "allows the user to undo their vote" do
        post_json = {
          reviewID: star_wars_review.id,
          voteType: -1
        }

        sign_in user1

        previous_count = Vote.count
        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(previous_count + 1)

        post_json = {
          reviewID: star_wars_review.id,
          voteType: -1
        }

        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(previous_count)
      end 
    end
  end
end
