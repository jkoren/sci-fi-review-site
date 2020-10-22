class Movie < ApplicationRecord
  has_many :reviews
  
  validates :title, presence: true
  validates :summary, presence: true
  validates :year, numericality: true
end