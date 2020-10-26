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
    new_movie = Movie.new
    new_movie.title = movie_params["title"]
    new_movie.summary = movie_params["summary"]
    new_movie.year = movie_params["year"]
    new_movie.movie_poster = movie_params["movie_poster"]

    if new_movie.save
      render json: new_movie
    else
      render json: { errors: new_movie.errors }
    end
  end

  private
    def movie_params
      params.require(:movie).permit([:title, :summary, :year, :movie_poster])
    end
end
