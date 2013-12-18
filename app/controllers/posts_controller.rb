class PostsController < ApplicationController

  def index
    @posts = current_user.posts.where("content_type IS NOT NULL")
    dan_log(@posts)
    render json: @posts
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
        @post.save if @post.has_content?
      end
    rescue StandardError => e
      render json: e
      dan_log(e.message)
    end

    render json: @post
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
