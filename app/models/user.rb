class User < ActiveRecord::Base
  attr_accessible :email, :pwd_hash, :token, :username

  def reset_token!
    self.token = generate_token
    self.save!
  end

  def generate_token
    SecureRandom.urlsafe_base64(16)
  end

  def password=(password)
    self.pwd_hash = BCrypt::Password.create(password)
  end

  def has_password?(password)
    BCrypt:Password.new(self.pwd_hash).is_password?(password)
  end
end
