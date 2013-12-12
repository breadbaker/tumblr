class Text < ActiveRecord::Base
  attr_accessible :post_id, :text, :title

  validates_presence_of :text, :title

end
