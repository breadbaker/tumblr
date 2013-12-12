class Text < ActiveRecord::Base
  attr_accessible :post_id, :text, :title
  
  validates_presence_of :text, :title
  
  after_initialize :create_post
  
  def create_post
    self.post = Post.create()
  end
end
