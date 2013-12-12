class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper

  before_filter :current_user

  def dan_log(m)
    logger.info "ERROR!!!!!!!!!!!!!!#{m} !!!!!!!!!!!!!"
  end

end
