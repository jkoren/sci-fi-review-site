class Api::V1::MoviesController < ApplicationController
  def index
    movies = Movie.all
    render json: movies 
  end 

  def create
    binding.pry
    new_movie = Movie.new(movie_params)
    if new_movie.save
      render json: new_movie
    else
      render json: { errors: new_movies.errors.full_messages}
    end

  end

    private

    def movie_params
      params.require(:movie).permit(:title, :summary, :year)
    end

end
