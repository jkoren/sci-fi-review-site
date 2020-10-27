class Api::V1::UpvotesController < ApplicationController
  # before_action :authenticate_user!
  def index
    upvotes_for_review = Upvote.where(review_id: params["review_id"])
    count = upvotes_for_review.count
    render json: count
  end

  def create
    review = Review.find(params["review_id"])
    upvote = Upvote.new(user: current_user, review: review)
    if upvote.save
      upvotes_for_review = Upvote.where(review_id: params["review_id"])
      count = upvotes_for_review.count
      render json: count
    else
      render json: "You cannot vote twice".to_json
    end
  end
end
