class Review < ApplicationRecord
  belongs_to :movie
  has_many :upvotes
  has_many :downvotes

  validates :rating, presence: true
  validates :movie, presence: true
end