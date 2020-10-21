class Api::V1::MoviesController < ApplicationController
  def index
    movies = Movie.all
    render json: movies 
  end 

  def create
    binding.pry
    new_movie = Movie.new(movie_params)
    binding.pry
    if new_movie.save
      binding.pry
      render json: new_movie
    else
      binding.pry
      render json: { errors: new_movies.errors.full_messages}
    end

    private

    def movie_params
      params.require(:movie).permit(:title, :summary, :year)
    end
  end
end
