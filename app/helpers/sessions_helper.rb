module SessionsHelper

  def login(user)
    logger.info 'setting token'
    user.reset_token!
    cookies[:token] = { :value => user.token, :expires => 9.hour.from_now }
  #  session[:token] = user.token
  end

  def logout
    user.reset_token!
  end

  def current_user
    dan_log(cookies[:token])
    @current_user ||= User.find_by_token(cookies[:token])
    #@current_user= User.find(2)
    unless @current_user
      head :bad_request
      raise
    end

    @current_user
  end

end
