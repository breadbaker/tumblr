class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :pwd_hash
      t.string :email
      t.string :token

      t.timestamps
    end
  end
end
