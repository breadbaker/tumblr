class PostsController < ApplicationController

  def index

    @posts = current_user.posts
    dan_log(@posts)
    render json: @posts
  end



  def create
    begin
      @post = current_user.posts.create!(params[:post])
      @content = params[:post][:content_type].constantize.create!(params[:content])
      head :ok
    rescue StandardError => e
      dan_log(e.message)
      @post.delete unless @post.nil?
      head :bad_request
    end
  end
end
