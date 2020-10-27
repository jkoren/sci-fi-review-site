class Api::V1::UpvotesController < ApplicationController
  # before_action :authenticate_user!

  def create
    review = Review.find(params["review_id"])
    upvote = Upvote.new(user: current_user, review: review)
    if upvote.save
      upvotes_for_review = Upvote.where(review_id: params["review_id"])
      count = upvotes_for_review.count
      binding.pry
      render json: count
    else
    end
  end
end
