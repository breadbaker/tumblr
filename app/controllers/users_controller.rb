class UsersController < ApplicationController

  skip_before_filter :current_user, only: [:create]
  layout 'login'

  def create
    begin
      @user = User.new(params[:user])
      login(@user)
      render json: {user: @user}, status: 200
    rescue StandardError => e
      dan_log(e.message)
      head :bad_request
    end
  end

  def show
    begin
      user = User.find_by_username(params[:id])
      posts = user.posts
      render json: posts
    rescue StandardError => e
      dan_log(e.message)
      head :bad_request
    end

  end
end
