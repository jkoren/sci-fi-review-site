class MovieShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :summary, :year

  has_many :reviews
end