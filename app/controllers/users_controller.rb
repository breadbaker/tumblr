class UsersController < ApplicationController

  skip_before_filter :current_user, only: [:create]
  layout 'login'

  def index
    @users = User.all
    render json: {users: @users, follow_ids: Follow.find_all_by_follower_id(current_user.id,:select => "followee_id")}
  end

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

  def update
    begin
      @user = User.find(params[:id])
      raise unless current_user == @user
      msg = []
      msg << @user.change_username!(params[:user][:name]) if params[:user][:name]
      msg << @user.change_pass!(params[:user]) if params[:user][:new]
      msg << @user.change_email!(params[:user]) if params[:user][:email]
      @user.save
      render json: {message: msg.join(' '), user: @user , status: 200 }
    rescue StandardError => e
      dan_log(e.message)
      render json: {message: e.message }, status: 400
    end
  end

  def followers

  end


  def follow_ids
    @follow_ids = Follow.find_all_by_follower_id(current_user.id,:select => "followee_id")
    render json: @follow_ids
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

  def follow
    begin
      followee = User.find(params[:id])
      Follow.create({
        follower_id: current_user.id,
        followee_id: followee.id
      })
      head :ok
    rescue
      head :bad_request
    end
  end

  def unfollow
    begin
      followee = Follow.find_by_follower_id_and_followee_id(current_user.id,params[:id])
      Follow.destroy()
      head :ok
    rescue
      head :bad_request
    end
  end

end
