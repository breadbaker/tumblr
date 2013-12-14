class Photo < ActiveRecord::Base
  attr_accessible :caption, :link, :post_id, :url, :image

  has_attached_file :image, styles: {
    big: "600x600>",
    small: "50x50#"
  }
end
