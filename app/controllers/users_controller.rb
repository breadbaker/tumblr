class UsersController < ApplicationController

  skip_before_filter :current_user, only: [:new,:create]
  layout 'login'

  def create
    begin
      @user = User.new(params[:user])
      login(@user)
      head :ok
    rescue
      head :bad_request
    end
  end
end
