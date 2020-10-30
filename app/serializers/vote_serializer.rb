class VoteSerializer < ActiveModel::Serializer
  attributes :id, :vote

  belongs_to :review
  belongs_to :user
end