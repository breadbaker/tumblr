class ChangePostDateToPostDatetime < ActiveRecord::Migration
  def up
    change_column :posts, :post_date, :datetime
  end
  def down
    change_column :posts, :post_date, :date
  end
end
