class Review < ApplicationRecord
  belongs_to :movie

  validates :rating, presence: true
  validates :movie, presence: true
end