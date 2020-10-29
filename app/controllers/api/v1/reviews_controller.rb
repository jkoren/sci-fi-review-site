class Api::V1::ReviewsController < ApplicationController
  before_action :authenticate_user, only: [:create]

  def show
    review = Review.find(params["id"])
    render json: review
  end
  
  def create
    movie = Movie.find(params[:movie_id])
    new_review = Review.new(review_params)
    new_review.movie = movie
    new_review.user = current_user 
    if new_review.save
      render json: new_review 
    else 
      render json: { errors: new_review.errors}
    end
  end

  private
  def review_params
    params.require(:review).permit(:rating, :body)
  end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end
end
