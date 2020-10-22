class MovieSerializer < ActiveModel::Serializer 
  attributes :id, :title, :summary, :year
end