class Api::V1::VotesController < ApplicationController
  # before_action :authenticate_user!
  def index
    downvotes_for_review = Vote.where(review_id: params["review_id"], vote: -1)
    upvotes_for_review = Vote.where(review_id: params["review_id"], vote: 1)
    total_votes = upvotes_for_review.count - downvotes_for_review.count
    render json: total_votes
  end

  def create
    review = Review.find(params["review_id"])
    vote = Vote.new(user: current_user, review: review, vote: params["vote"]["type"])
    if vote.save
      downvotes_for_review = Vote.where(review_id: params["review_id"], vote: -1)
      upvotes_for_review = Vote.where(review_id: params["review_id"], vote: 1)
      total_votes = upvotes_for_review.count - downvotes_for_review.count
      render json: total_votes
    else
      vote = Vote.where(user: current_user)
      vote.delete_all

      downvotes_for_review = Vote.where(review_id: params["review_id"], vote: -1)
      upvotes_for_review = Vote.where(review_id: params["review_id"], vote: 1)
      total_votes = upvotes_for_review.count - downvotes_for_review.count
      render json: total_votes
    end
  end

end
