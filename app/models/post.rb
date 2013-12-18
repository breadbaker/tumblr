class Post < ActiveRecord::Base
  attr_accessible :post_date, :user_id, :content_type

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  def content=(content)
    if self.content
      self.content.update_attributes(content)
    else
      content[:post_id] = self.id
      self.content_type.constantize.create(content)
    end
  end

  def content
    return false unless self.content_type
    self.content_type.constantize.find_by_post_id(self.id)
  end

  def has_content?
    content_type = self.content_type
    return false unless content_type

    !!(self.content)
  end

  def as_json(post)
    {
      content_type: self.content_type,
      post_date: self.post_date,
      content: self.content,
      username: self.user.username,
      id: self.id
    }
  end

end
