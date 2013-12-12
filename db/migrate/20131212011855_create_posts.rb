class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.date :post_date
      t.integer :user_id
      t.string :type

      t.timestamps
    end
  end
end
