class Post < ActiveRecord::Base
  attr_accessible :post_date, :user_id

  def initialize(data, type)
    @content = Text.new(data[:content])
    set_post_date(data[:post_date])
  end

  def set_post_date(date)
    true
  end
end
