class CreateAvatars < ActiveRecord::Migration
  def change
    create_table :avatars do |t|
      t.string :url

      t.timestamps
    end
  end
end
