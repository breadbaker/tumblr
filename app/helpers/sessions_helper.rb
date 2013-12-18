module SessionsHelper

  def login(user)
    logger.info 'setting token'
    user.reset_token!
    cookies[:token] = { :value => user.token, :expires => 9.hour.from_now }
  #  session[:token] = user.token
  end

  def logout
    current_user.reset_token!
  end

  def current_user
    dan_log(cookies[:token])
    @current_user ||= User.find_by_token(cookies[:token])
    unless @current_user
      head :bad_request
    end

    @current_user
  end

end
