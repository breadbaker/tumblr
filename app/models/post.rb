class Post < ActiveRecord::Base
  attr_accessible :post_date, :user_id, :content_type

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  def content
    self.content_type.constantize.find_by_post_id(self.id)
  end

  def as_json(post)
    {
      content_type: self.content_type,
      post_date: self.post_date,
      content: self.content
    }
  end

end
