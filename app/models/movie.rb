class Movie < ApplicationRecord
  validates :title, presence: true
  validates :summary, presence: true
  validates :year, numericality: true
end




