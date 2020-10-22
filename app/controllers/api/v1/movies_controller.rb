class Api::V1::MoviesController < ApplicationController
  def index
    movies = Movie.all
    render json: movies 
  end 

  def create
    new_movie = Movie.new(movie_params)
    if new_movie.save
      flash[:notice] = "Movie added successfully"
      render json: new_movie
    else
      flash.now[:notice] = new_movies.errors.full_messages.to_sentence
      # render json: { errors: new_movies.errors.full_messages}
    end

  end

    private

    def movie_params
      params.require(:movie).permit(:title, :summary, :year)
    end

end
