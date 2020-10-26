class Api::V1::ReviewsController < ApplicationController
  def create
    movie = Movie.find(params[:movie_id])
    
    new_review = Review.new(review_params)
    new_review.movie = movie
    
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

end
