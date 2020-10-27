class Downvote < ApplicationRecord
  belongs_to :review
  belongs_to :user

  validates :review, uniqueness: { scope: :user }
  validates :user, uniqueness: { scope: :review }
end
