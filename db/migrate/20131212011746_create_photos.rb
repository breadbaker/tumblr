class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :caption
      t.string :link
      t.integer :post_id
      t.string :url

      t.timestamps
    end
  end
end
