class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :rating

  belongs_to :movie
  belongs_to :user

  has_many :votes
end