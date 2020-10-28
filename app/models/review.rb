class Review < ApplicationRecord
  belongs_to :movie
  belongs_to :user

  validates :rating, presence: true
  validates :movie, presence: true
  validates :user, presence: true
end