class SessionsController < ApplicationController

  skip_before_filter :current_user, only: [:create]
  layout 'login'

  def new
  end

  def forgot
    begin
      @user = User.find_by_credentials!(params[:user])
      login(@user)
      head :ok
    rescue
      head :bad_request
    end
  end

  def create
    begin
      @user = User.find_by_token(cookies[:token])
      @user = User.find_by_credentials!(params[:user]) unless @user
      login(@user)

      render json: {user: @user}, status: 200
    rescue StandardError => e
      logger.info e.message
      head :bad_request
    end
  end

  def destroy
    begin
      logout
    rescue
    end
    head :ok
  end
end
