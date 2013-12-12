module SessionsHelper

  def login(user)
    logger.info 'setting token'
    user.reset_token!
    session[:token] = user.token
  end

  def logout
    user.reset_token!
  end

  def current_user
    @current_user ||= User.find_by_token(session[:token])
    unless @current_user
      head :bad_request
      raise
    end

    @current_user
  end

end
