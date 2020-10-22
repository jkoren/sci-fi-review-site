class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :rating

  belongs_to :movie
end

  