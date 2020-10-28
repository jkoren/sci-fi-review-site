class Api::V1::MoviesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

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
      render json: { errors: new_movie.errors }
    end
  end

  private
    def movie_params
      params.require(:movie).permit([:title, :summary, :year, :movie_poster])
    end

    def authenticate_user
      if !user_signed_in?
        render json: {error: ["You need to be signed in first"]}
      end
    end
end
