class Api::V1::MoviesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    movies = Movie.all
    render json: movies
  end

  def show
    movie = Movie.find(params[:id])
    render json: {
      movie: serialized_data(movie, MovieSerializer),
      reviews: serialized_data(movie.reviews, ReviewSerializer)
    }
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

    def serialized_data(data, serializer)
      ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer, scope: current_user)
    end
end
