class CreateTexts < ActiveRecord::Migration
  def change
    create_table :texts do |t|
      t.integer :post_id
      t.text :text
      t.string :title

      t.timestamps
    end
  end
end
