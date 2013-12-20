class User < ActiveRecord::Base
  attr_accessible :email, :pwd_hash, :token, :username, :password, :avatar

  validates_presence_of :username, :email
  before_save :legit_email
  validates_uniqueness_of :username, :email

  after_initialize :set_avatar

  has_many(
    :follows_recieved,
    class_name: 'Follow',
    foreign_key: :followee_id,
    primary_key: :id
  )

  has_many :followers, through: :follows_recieved, source: :follower

  has_many(
    :follows_sent,
    class_name: 'Follow',
    foreign_key: :follower_id,
    primary_key: :id
  )

  has_many :followees, through: :follows_sent, source: :followee

  has_many(
    :posts,
    class_name: "Post",
    foreign_key: :user_id,
    primary_key: :id
  )

  def set_avatar
    self.avatar = Avatar.find(Random.rand(Avatar.count-1)+1).url unless self.avatar
  end

  def legit_email
    raise "Invalid Email" unless self.email && self.email.match(/^.+@.+$/)
  end

  def change_pass!(data)
    return unless data[:new].length > 0
    raise "Incorrect Password" unless self.has_password?(data[:password])

    if data[:new] != data[:confirm]
      raise 'Passwords do not match'
    end
    self.password= data[:new]

    return 'Password Changed'
  end

  def change_username!(name)
    return if name.nil?
    name_taken = User.find_by_username(name)
    raise "Name Taken" if name_taken
    self.username = name

    return "Name Changed"
  end

  def change_email!(data)

    user_with = User.find_by_email(data[:email])
    raise 'Email Taken' if user_with
    self.email = data[:email]

    return "Email Changed"
  end

  def self.find_by_credentials!( user )
    @user = User.find_by_email!(user[:email])
    raise "Invalid Password" unless @user.has_password?(user[:password])

    @user
  end

  def reset_token!
    self.token = generate_token
    self.save! unless self.email.nil?
  end

  def generate_token
    SecureRandom.urlsafe_base64(16)
  end

  def password=(password)
    raise 'Password Cannot Be Blank' if password.nil?
    raise 'Password is too short' if password.length < 6
    self.pwd_hash = BCrypt::Password.create(password)
  end

  def has_password?(password)
    BCrypt::Password.new(self.pwd_hash).is_password?(password)
  end

end
