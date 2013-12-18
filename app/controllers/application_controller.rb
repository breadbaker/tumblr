class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper

  before_filter :current_user

  #after_filter :set_access_control_headers

  # def set_access_control_headers
 #    headers['Access-Control-Allow-Origin'] = 'http://localhost:3000/'
 #    headers['Access-Control-Request-Method'] = '*'
 #  end

  def dan_log(m)
    logger.info "ERROR!!!!!!!!!!!!!!#{m} !!!!!!!!!!!!!"
  end

end
