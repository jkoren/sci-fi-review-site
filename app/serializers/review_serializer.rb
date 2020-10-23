class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :rating

  belongs_to :movie
<<<<<<< HEAD
end

  
=======
end
>>>>>>> 61d365b6c101615114bef687065ff7ba3a89b14e
