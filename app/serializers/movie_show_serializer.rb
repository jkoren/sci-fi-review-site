class MovieShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :summary, :year, :movie_poster

  has_many :reviews
end