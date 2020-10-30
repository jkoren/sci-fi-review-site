class Review < ApplicationRecord
  has_many :votes
  
  belongs_to :user
  belongs_to :movie

  validates :rating, presence: true
  validates :movie, presence: true
  validates :user, presence: true
end