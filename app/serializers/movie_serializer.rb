class MovieSerializer < ActiveModel::Serializer 
  attributes :id, :title, :summary, :year, :movie_poster
end