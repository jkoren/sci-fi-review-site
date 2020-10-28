class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.integer :vote, null: false

      t.belongs_to :review, null: false
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
