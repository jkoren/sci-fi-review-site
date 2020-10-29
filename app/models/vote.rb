class Vote < ApplicationRecord
  belongs_to :review
  belongs_to :user

  validates :review, uniqueness: { scope: :user }
  validates :user, uniqueness: { scope: :review }

  validates :vote, numericality: true, inclusion: { in: [-1, 1] }
end
