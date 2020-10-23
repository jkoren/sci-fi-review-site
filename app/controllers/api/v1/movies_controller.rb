class Api::V1::MoviesController < ApplicationController
  
  def index
    movies = Movie.all
    render json: movies
  end

  def show
    movie = Movie.find(params[:id])
    render json: movie, serializer: MovieShowSerializer 
  end

  def create
    new_movie = Movie.new(movie_params)
    if new_movie.save
      render json: new_movie
    else
      render json: { errors: new_movie.errors}
    end
  end

  private
    def movie_params
      params.require(:movie).permit(:title, :summary, :year)
    end
  
end
