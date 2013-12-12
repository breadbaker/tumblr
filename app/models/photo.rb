class Photo < ActiveRecord::Base
  attr_accessible :caption, :link, :post_id, :url
end
