class AddMoviePosterToMovies < ActiveRecord::Migration[5.2]
  def change 
    add_column :movies, :movie_poster, :string
  end
end
