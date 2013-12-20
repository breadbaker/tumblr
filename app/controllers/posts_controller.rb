class PostsController < ApplicationController

  def index
    #@posts = current_user.posts.where("content_type IS NOT NULL")

    #ids = current_user.followees.map { |e| e.id}
    ids = Follow.find_all_by_follower_id(current_user.id).map{ |f| f.followee_id }
    ids << current_user.id
    posts = Post.where("content_type IS NOT NULL").order("post_date DESC").find_all_by_user_id(ids)
    dan_log(posts)
    render json: posts
  end


  def update
    begin
      @post = current_user.posts.where("id = ?", params[:id]).first
      puts @post.id
      @post.content_type = params[:post][:content_type]
      if !@post.content_type
        @post.destroy
      else
        @post.content = params[:content]
        @post.private = params[:post][:private] || false
        @post.post_date = params[:post][:post_date] || Time.now
        @post.save if @post.has_content?
      end
      render json: @post
    rescue StandardError => e
      render json: e
      dan_log(e.message)
    end


  end

  def destroy
    begin
      @post = current_user.posts.where("id = ?", params[:id]).first
      @post.delete_content
      @post.destroy
    rescue StandardError => e
      head :bad_request
      dan_log(e.message)
    end

    head :ok
  end


  def create
    begin
      @post = current_user.posts.create!(params[:post])
     # @content = params[:post][:content_type].constantize.create!(params[:content])
      render json: @post
    rescue StandardError => e
      dan_log(e.message)
      @post.delete unless @post.nil?
      head :bad_request
    end
  end
end
